let actorD = item.actor;
let level = actorD.items.getName("Barbarian").data.data.levels;
let subClass = actorD.items.getName("Barbarian").data.data.subclass;

let weapon = "";

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
        label: "Bite",
        value: {
          embedded: {
            Item: {
              [bite.name]: bite,
            },
          },
        },
      },
      {
        label: "Claws",
        value: {
          embedded: {
            Item: {
              [claws.name]: claws,
            },
          },
        },
      },
      {
        label: "Tail",
        value: {
          embedded: {
            Item: {
              [tail.name]: tail,
              [tailSwipe.name]: tailSwipe,
            },
          },
        },
      },
    ],
    title: "Which Form of the Beast?",
    content: `<p>When you enter your rage, you can transform, revealing the bestial power within you. Until the rage ends, you manifest a natural weapon. It counts as a simple melee weapon for you, and you add your Strength modifier to the attack and damage rolls when you attack with it, as normal.</p>
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

let updates = mergeObject(rageAE, weapon);

await warpgate.mutate(token.document, updates, {}, options); //Let's mutate the token document with some updates(stats changes and active effect on), callbacks(animation function) and options(name).
