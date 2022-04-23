// throat clearing to get data on token
const lastArg = args[args.length - 1];
let tokenD;
if (lastArg.tokenId) tokenD = canvas.tokens.get(lastArg.tokenId).actor;
else tokenD = game.actors.get(lastArg.actorId);
let item = args[1]; //passed by @item in the DAE field
let level = tokenD.items.getName("Barbarian").data.data.levels;
let subClass = tokenD.items.getName("Barbarian").data.data.subclass;
let name = tokenD.data.token.name;
let mgcProp = "";
if (level > 5) {
  mgcProp = true;
}

if (args[0] === "on") {
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
      .file("jb2a.markers.02.pink")
      .atLocation(tokenD)
      .duration(3000)
      .fadeIn(500)
      .fadeOut(500)
      .scale(0.75)
      .waitUntilFinished(-500)

      .effect()
      .file("jb2a.impact.purple.1")
      .atLocation(tokenD)
      .fadeIn(100)
      .fadeOut(200)
      .waitUntilFinished(-500)
      .scale(0.75)

      .effect()
      .file("jb2a.impact.011.dark_purple")
      .atLocation(tokenD)
      .fadeIn(500)
      .fadeOut(500)
      .scale(0.75)
      .waitUntilFinished(-500)
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
  // let bite = game.items.getName("Form of the Beast: Bite").toObject();
  // let claws = game.items.getName("Form of the Beast: Claws").toObject();
  // let tail = game.items.getName("Form of the Beast: Tail").toObject();
  // let tailSwipe = game.items
  //   .getName("Form of the Beast: Tail Swipe")
  //   .toObject();
  let bite = {
    name: "Form of the Beast: Bite",
    type: "weapon",
    img: "icons/creatures/abilities/mouth-teeth-long-red.webp",
    data: {
      description: {
        value:
          "<p><strong>Bite.</strong> Your mouth transforms into a bestial muzzle or great mandibles (your choice). It deals 1d8 + 4 piercing damage on a hit. Once on each of your turns when you damage a creature with this bite, you regain a number of hit points equal to your proficiency bonus, provided you have less than half your hit points when you hit.</p>",
      },
      quantity: 1,
      weight: 0,
      price: 0,
      attunement: 0,
      equipped: true,
      identified: true,
      activation: {
        type: "action",
        cost: 1,
      },
      target: {
        value: 1,
        width: null,
        type: "creature",
      },
      range: {
        value: 5,
        units: "ft",
      },
      actionType: "mwak",
      attackBonus: "0",
      damage: {
        parts: [["1d8[piercing]+@mod", "piercing"]],
      },
      weaponType: "natural",
      properties: {
        mgc: `${mgcProp}`,
      },
      proficient: true,
    },
    flags: {
      favtab: {
        isFavorite: true,
      },
      midiProperties: {
        magicdam: `${mgcProp}`,
      },
    },
  };
  let claws = {
    name: "Form of the Beast: Claws",
    type: "weapon",
    img: "icons/commodities/claws/claws-white.webp",
    data: {
      description: {
        value:
          "<p><strong>Claws.</strong> Each of your hands transforms into a claw, which you can use as a weapon if it’s empty. It deals 1d6 +4 slashing damage on a hit. Once on each of your turns when you attack with a claw using the Attack action, you can make one additional claw attack as part of the same action.</p>",
      },
      quantity: 1,
      weight: 0,
      price: 0,
      attunement: 0,
      equipped: true,
      identified: true,
      activation: {
        type: "action",
        cost: 1,
      },
      target: {
        value: 1,
        type: "creature",
      },
      range: {
        value: 5,
        units: "ft",
      },
      actionType: "mwak",
      attackBonus: "0",
      damage: {
        parts: [["1d6[slashing]+@mod", "slashing"]],
      },
      weaponType: "natural",
      properties: {
        mgc: `${mgcProp}`,
      },
      proficient: true,
    },
    flags: {
      favtab: {
        isFavorite: true,
      },
      midiProperties: {
        magicdam: `${mgcProp}`,
      },
    },
  };
  let tail = {
    name: "Form of the Beast: Tail",
    type: "weapon",
    img: "icons/commodities/biological/tail-puff-grey.webp",
    data: {
      description: {
        value:
          "<p><strong>Tail.</strong> You grow a lashing, spiny tail, which deals 1d8+4 piercing damage on a hit and has the reach property. If a creature you can see within 10 feet of you hits you with an attack roll, you can use your reaction to swipe your tail and roll a d8, applying a bonus to your AC equal to the number rolled, potentially causing the attack to miss you.</p>",
      },
      quantity: 1,
      weight: 0,
      price: 0,
      attunement: 0,
      equipped: true,
      identified: true,
      activation: {
        type: "action",
        cost: 1,
      },
      target: {
        value: 1,
        type: "creature",
      },
      range: {
        value: 10,
        units: "ft",
      },
      actionType: "mwak",
      attackBonus: "0",
      damage: {
        parts: [["1d8[piercing]+@mod", "piercing"]],
      },
      weaponType: "natural",
      properties: {
        mgc: `${mgcProp}`,
        rch: true,
      },
      proficient: true,
    },
    flags: {
      favtab: {
        isFavorite: true,
      },
      midiProperties: {
        magicdam: `${mgcProp}`,
      },
    },
  };
  let tailSwipe = {
    name: "Form of the Beast: Tail Swipe",
    type: "weapon",
    img: "icons/commodities/biological/tail-puff-grey.webp",
    data: {
      description: {
        value:
          "<p><strong>Tail.</strong> You grow a lashing, spiny tail, which deals 1d8 piercing damage on a hit and has the reach property. If a creature you can see within 10 feet of you hits you with an attack roll, you can use your reaction to swipe your tail and roll a d8, applying a bonus to your AC equal to the number rolled, potentially causing the attack to miss you.</p>",
      },
      quantity: 1,
      weight: 0,
      price: 0,
      attunement: 0,
      equipped: true,
      identified: true,
      activation: {
        type: "reaction",
        cost: 1,
      },
      target: {
        type: "self",
      },
      range: {
        units: "self",
      },
      weaponType: "natural",
      properties: {
        mgc: `${mgcProp}`,
      },
      proficient: true,
    },
    effects: [
      {
        changes: [
          {
            key: "data.attributes.ac.bonus",
            mode: 2,
            value: "[[+1d8]]",
            priority: "20",
          },
        ],
        icon: "systems/dnd5e/icons/items/inventory/monster-tail.jpg",
        label: "Form of the Beast: Tail Swipe",
        flags: {
          dae: {
            specialDuration: ["1Reaction"],
            transfer: false,
            stackable: "none",
            durationExpression: "",
            macroRepeat: "none",
          },
          "dnd5e-helpers": {
            "rest-effect": "Ignore",
          },
        },
        selectedKey: "data.attributes.ac.bonus",
        _id: "o5kga2qd35cjz78v",
        disabled: false,
        duration: {
          startTime: null,
        },
        transfer: false,
        tint: null,
      },
    ],
    flags: {
      favtab: {
        isFavorite: true,
      },
    },
  };

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
  let updates = weapon.update;
  // let updates = mergeObject(rageAE, weapon.update); << old version

  await warpgate.mutate(token.document, updates, mCallbacks, options); //Let's mutate the token document with some updates(stats changes and active effect on), callbacks(animation function) and options(name).
}

if (args[0] === "off") {
  warpgate.revert(token.document, "Rage");
}
