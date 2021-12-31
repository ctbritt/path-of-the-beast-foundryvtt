// throat clearing to get data on token
const lastArg = args[args.length - 1];
const tokenD = canvas.tokens.get(lastArg.tokenId);
let actorD = item.actor;
let level = actorD.items.getName("Barbarian").data.data.levels;
let subClass = actorD.items.getName("Barbarian").data.data.subclass;
let name = tokenD.data.name;

// Mesages for when your barbarian gets angry. Feel free to customize.
let biteMsg = name + " grows fierce, snarly teeth!";
let clawMsg = name + " grows sharp, slashing claws!";
let tailMsg = name + " grows a long, swinging tail!";
let rageMsg = name + " is ... RAGING!";

// Define weapon if no weapon will be chosen later.
let weapon = "";

const animation = async () => {
  let effectScale = 0.25;
  let effectColor = "dark_red"; //Change "blue" to "dark_red" for example if you have the patreon version of JB2A

  new Sequence()
    .effect()
    .attachTo(token) //Instead of atLocation(), we want the animation to be stuck to the token so it follows it around
    .file(`jb2a.energy_strands.complete.${effectColor}.01`)
    .belowTokens() //by default, the effect would be played above the tokens, we want this one to be played underneath so we can place the overlay above it
    .scale(effectScale)
    .persist() //This will make it contiously loop until dismissed by another bit of code we'll define underneath as the animationEnd() function.
    .name(`${item.actor.data.name}- Rage -${token.data._id}`) //We want a unique name that will make dismissing it later on easier.
    .effect()
    .attachTo(token)
    .file(`jb2a.energy_strands.overlay.${effectColor}.01`)
    .scale(effectScale)
    .persist()
    .fadeOut(500)
    .name(`${item.actor.data.name}- Rage -${token.data._id}`) //Named it the same as the previous effect so we can dismiss both effects at the same time
    .play();
};

async function animationEnd() {
  Sequencer.EffectManager.endEffects({
    name: `${item.actor.data.name}- Rage -${token.data._id}`,
  }); //When we revert the mutation, we'll call this function to dismiss the animation
}

let mCallbacks = {
  post: animation, //Straight after the mutation, we want to execute this animation function as a callback
};

function condition(eventData) {
  console.log(token.id, eventData.actorData.token);
  console.log(token.id === eventData.actorData.token._id);
  return token.id === eventData.actorData.token._id; //This condition makes sure we have the correct token to revert the mutation from
}

// Define the weapons from existing items
let bite = game.items.getName("Form of the Beast: Bite").toObject();
delete bite._id;
let claws = game.items.getName("Form of the Beast: Claws").toObject();
delete claws._id;
let tail = game.items.getName("Form of the Beast: Tail").toObject();
delete tail._id;
let tailSwipe = game.items.getName("Form of the Beast: Tail Swipe").toObject();
delete tailSwipe._id;

// Check if correct subclass is in place
if (subClass == "Path of the Beast") {
  const buttonData = {
    buttons: [
      {
        label:
          "<a title='Your mouth transforms into a bestial muzzle or great mandibles (your choice). It deals 1d8 piercing damage on a hit. Once on each of your turns when you damage a creature with this bite, you regain a number of hit points equal to your proficiency bonus, provided you have less than half your hit points when you hit.' alt='Your mouth transforms into a bestial muzzle or great mandibles (your choice). It deals 1d8 piercing damage on a hit. Once on each of your turns when you damage a creature with this bite, you regain a number of hit points equal to your proficiency bonus, provided you have less than half your hit points when you hit.'>Bite</a>",
        value: {
          msg: biteMsg,
          update: {
            embedded: {
              Item: {
                [bite.name]: bite,
              },
            },
          },
        },
      },
      {
        label:
          "<a title='Each of your hands transforms into a claw, which you can use as a weapon if it’s empty. It deals 1d6 slashing damage on a hit. Once on each of your turns when you attack with a claw using the Attack action, you can make one additional claw attack as part of the same action.' alt='Each of your hands transforms into a claw, which you can use as a weapon if it’s empty. It deals 1d6 slashing damage on a hit. Once on each of your turns when you attack with a claw using the Attack action, you can make one additional claw attack as part of the same action.'>Claws</a>",
        value: {
          msg: clawMsg,
          update: {
            embedded: {
              Item: {
                [claws.name]: claws,
              },
            },
          },
        },
      },
      {
        label:
          "<a title='You grow a lashing, spiny tail, which deals 1d8 piercing damage on a hit and has the reach property. If a creature you can see within 10 feet of you hits you with an attack roll, you can use your reaction to swipe your tail and roll a d8, applying a bonus to your AC equal to the number rolled, potentially causing the attack to miss you.' alt='You grow a lashing, spiny tail, which deals 1d8 piercing damage on a hit and has the reach property. If a creature you can see within 10 feet of you hits you with an attack roll, you can use your reaction to swipe your tail and roll a d8, applying a bonus to your AC equal to the number rolled, potentially causing the attack to miss you.'>Tail</a>",
        value: {
          msg: tailMsg,
          update: {
            embedded: {
              Item: {
                [tail.name]: tail,
                [tailSwipe.name]: tailSwipe,
              },
            },
          },
        },
      },
    ],
    title: "Which Form of the Beast?",
    content: `<p><img src="https://www.dndbeyond.com/avatars/thumbnails/13710/613/420/618/637402706646069197.png" height="100" style="float:left;outline:0;border:0;vertical-align:middle;margin:0px 10px">When you enter your rage, you can transform, revealing the bestial power within you. Until the rage ends, you manifest a natural weapon. It counts as a simple melee weapon for you, and you add your Strength modifier to the attack and damage rolls when you attack with it, as normal.</p>
    <p>You choose the weapon’s form each time you rage:</p>`,
  };
  weapon = await warpgate.buttonDialog(buttonData);
}

// Set universal Rage active effects
let rageAE = {
  embedded: {
    ActiveEffect: {
      Rage: {
        icon: item.img,
        changes: [
          {
            key: "data.bonuses.mwak.damage", //add the bonus to melee weapon attacks
            mode: 2,
            value: Math.ceil(
              Math.floor(level / (9 - Math.floor(level / 9)) + 2)
            ), //Some clever math to add the correct amount, depending on the barbarian level
            priority: 0,
          },
          {
            key: "data.traits.dr.value", //Add a resistance to Slashing damage
            value: "slashing",
            mode: 2,
            priority: 0,
          },
          {
            key: "data.traits.dr.value",
            value: "bludgeoning",
            mode: 2,
            priority: 0,
          },
          {
            key: "data.traits.dr.value",
            value: "piercing",
            mode: 2,
            priority: 0,
          },
          {
            key: "flags.midi-qol.advantage.ability.save.str",
            value: 1,
            mode: 0,
            priority: 0,
          },
          {
            key: "flags.midi-qol.advantage.ability.check.str",
            value: 1,
            mode: 0,
            priority: 0,
          },
        ],
        duration: { rounds: 10 },
      },
    },
  },
};

const options = {
  comparisonKeys: { ActiveEffect: "label" },
  name: "Rage", //Let's give the mutation a name so when we shift-click the revert button, we'll identify the right mutation to revert
};

// send fun message about weapons if available
if (weapon.msg) {
  ui.notifications.info(weapon.msg);
} else {
  ui.notifications.info(rageMsg);
}

// merge updates for spawning
let updates = mergeObject(rageAE, weapon.update);

await warpgate.mutate(token.document, updates, mCallbacks, options); //Let's mutate the token document with some updates(stats changes and active effect on), callbacks(animation function) and options(name).
warpgate.event.trigger(warpgate.EVENT.REVERT, animationEnd, condition);
