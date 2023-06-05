const lastArg = args[args.length - 1];
const { tokenId, actorId } = lastArg;
if (!tokenId && !actorId) {
  console.error("No token or actor selected");
  return;
}
let actorD = tokenId
  ? canvas.tokens.get(tokenId).actor
  : game.actors.get(actorId);
if (!actorD) {
  console.error("No actor found");
  return;
}
const barbarianClass = actorD.classes?.barbarian;
const level = barbarianClass.system.levels;
if (!barbarianClass) {
  ui.notifications.warn("You are not a barbarian!");
  return;
}
const subClass = barbarianClass.subclass.name;
const name = actorD.name;
const mod = actorD.system.abilities.str.mod;
let mgcProp = level > 5 ? true : "";


if (args[0] === "on") {
  let biteMsg = `${name} grows fierce, snarly teeth!`;
  let clawMsg = `${name} grows sharp, slashing claws!`;
  let tailMsg = `${name} grows a long, swinging tail!`;
  let rageMsg = `${name} is ... RAGING!`;

  // Define weapon if no weapon will be chosen later.
  let weapon = "";

  function condition(eventData) {
    return token.id === eventData.actorData.token._id; //This condition makes sure we have the correct token to revert the mutation from
  }

  // Define the weapons
  let bite = {
    name: "Form of the Beast: Bite",
    type: "weapon",
    img: "icons/creatures/abilities/mouth-teeth-long-red.webp",
    effects: [
      {
        _id: "SwjTdomYq58tha05",
        changes: [
          {
            key: "flags.dnd5e.DamageBonusMacro",
            mode: 0,
            value: "ItemMacro.Form of the Beast: Bite",
            priority: 20,
          },
        ],
        icon: "icons/creatures/abilities/mouth-teeth-long-red.webp",
        label: "Beast Bite",
        origin: "Item.rauFpreQtKHaqkd7",
        transfer: true,
        flags: {
          favtab: {
            isFavorite: true,
          },
          dae: {
            stackable: "none",
            durationExpression: "",
            macroRepeat: "none",
            specialDuration: [],
            transfer: true,
          },
        },
      },
    ],

    flags: {
      favtab: {
        isFavorite: true,
      },
      "tidy5e-sheet": {
        favorite: true,
      },
      midiProperties: {
        magicdam: `${mgcProp}`,
      },
      itemacro: {
        macro: {
          data: {
            _id: null,
            name: "Form of the Beast: Bite",
            type: "script",
            author: "jM4h8qpyxwTpfNli",
            img: "icons/svg/dice-target.svg",
            scope: "global",
            command:
              '/*****\nForm of the Beast: Bite\n\nUSEAGE : AUTOMATED\nThis item should be placed on the character that has Psionic Power: Psychic Whispers\n\nYour mouth transforms into a bestial muzzle or great mandibles (your choice). It deals 1d8 piercing damage on a hit. Once on each of your turns when you damage a creature with this bite, you regain a number of hit points equal to your proficiency bonus, provided you have less than half your hit points when you hit.\n\nv0.1 April 25 2022 jbowens #0415 (Discord) https://github.com/jbowensii/More-Automated-Spells-Items-and-Feats.git\n*****/\n// who\'s who?\nconst thisItem = await fromUuid(args[0].itemUuid);\nconst pcToken = token;\nconst pcActor = token.actor;\n\n// check character current hp > 1/2 max hp return\nconst halfHP = actor.system.attributes.hp.max / 2;\nconst currentHP = actor.system.attributes.hp.value;\n\nif (currentHP >= halfHP) return;\n\n// test and set combat flag for use once per round if in combat\nif (game.combat) {\n  const combatTime = `${game.combat.id}-${\n    game.combat.round + game.combat.turn / 100\n  }`;\n\n  console.log("combatTime:", combatTime);\n\n  const lastTime = actor.getFlag("midi-qol", "beastBite");\n  if (combatTime === lastTime) return;\n  // already used Beast Bite this round return\n  else await actor.setFlag("midi-qol", "beastBite", combatTime);\n}\n\n// get character proficiency bonus and heal that amount\nconst healAmount = actor.system.attributes.prof;\nawait MidiQOL.applyTokenDamage(\n  [{ damage: healAmount, type: "healing" }],\n  healAmount,\n  new Set([pcToken]),\n  thisItem,\n  new Set()\n);\n\nreturn;',
            folder: null,
            sort: 0,
            permission: {
              default: 0,
            },
            flags: {},
          },
        },
      },
      core: {
        sourceId: "Item.rauFpreQtKHaqkd7",
      },
      "midi-qol": {
        fumbleThreshold: null,
        effectActivation: false,
        onUseMacroName: "",
      },
    },
    system: {
      description: {
        value:
          "<p><strong>Bite.</strong> Your mouth transforms into a bestial muzzle or great mandibles (your choice). It deals 1d8 + 4 piercing damage on a hit. Once on each of your turns when you damage a creature with this bite, you regain a number of hit points equal to your proficiency bonus, provided you have fewer than half your hit points when you hit.</p>",
      },
      quantity: 1,
      equipped: true,
      identified: true,
      activation: {
        type: "action",
        cost: 1,
        condition: "",
      },
      target: {
        value: 1,
        width: null,
        units: "",
        type: "creature",
      },
      range: {
        value: 5,
        long: null,
        units: "ft",
      },
      actionType: "mwak",
      damage: {
        parts: [["1d8+@mod", "piercing"]],
        versatile: "",
      },
      weaponType: "natural",
      proficient: true,
    },
  };
  let claws = {
    name: "Form of the Beast: Claws",
    type: "weapon",
    img: "icons/commodities/claws/claws-white.webp",
    system: {
      description: {
        value:
          "<p><strong>Claws.</strong> Each of your hands transforms into a claw, which you can use as a weapon if it’s empty. It deals 1d6 + 4 slashing damage on a hit. Once on each of your turns when you attack with a claw using the Attack action, you can make one additional claw attack as part of the same action.</p><p></p>",
      },
      quantity: 1,
      equipped: true,
      identified: true,
      activation: {
        type: "action",
        cost: 1,
        condition: "",
      },
      target: {
        value: 1,
        width: null,
        units: "",
        type: "creature",
      },
      range: {
        value: 5,
        long: null,
        units: "ft",
      },
      actionType: "mwak",
      damage: {
        parts: [["1d6+@mod", "slashing"]],
        versatile: "",
      },
      weaponType: "natural",
      proficient: true,
    },
    flags: {
      favtab: {
        isFavorite: true,
      },
      "tidy5e-sheet": {
        favorite: true,
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
    system: {
      description: {
        value:
          "<p><strong>Tail.</strong> You grow a lashing, spiny tail, which deals 1d8 + 4 piercing damage on a hit and has the reach property.</p>",
        chat: "",
        unidentified: "",
      },
      quantity: 1,
      equipped: true,
      identified: true,
      activation: {
        type: "action",
        cost: 1,
        condition: "",
      },
      target: {
        value: 1,
        width: null,
        units: "",
        type: "creature",
      },
      range: {
        value: 10,
        long: null,
        units: "ft",
      },
      actionType: "mwak",
      damage: {
        parts: [["1d8+@mod", "piercing"]],
        versatile: "",
      },
      weaponType: "natural",
      baseItem: "",
      proficient: true,
    },
    flags: {
      favtab: {
        isFavorite: true,
      },
      "tidy5e-sheet": {
        favorite: true,
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
    effects: [
      {
        changes: [
          {
            key: "system.attributes.ac.bonus",
            mode: 2,
            value: "[[+1d8]]",
            priority: 20,
          },
        ],
        icon: "icons/commodities/biological/tail-puff-grey.webp",
        label: "Form of the Beast: Tail Swipe",
        flags: {
          dae: {
            specialDuration: ["1Reaction"],
            transfer: false,
            stackable: "none",
            durationExpression: "",
            macroRepeat: "none",
            selfTarget: false,
            selfTargetAlways: false,
          },
        },
        _id: "o5kga2qd35cjz78v",
        transfer: false,
      },
    ],
    flags: {
      favtab: {
        isFavorite: true,
      },
      "tidy5e-sheet": {
        favorite: true,
      },
    },
    system: {
      description: {
        value:
          "<p><strong>Tail Swipe.</strong> If a creature you can see within 10 feet of you hits you with an attack roll, you can use your reaction to swipe your tail and roll 1d8, applying a bonus to your AC equal to the number rolled, potentially causing the attack to miss you.</p>",
      },
      quantity: 1,
      equipped: true,
      identified: true,
      activation: {
        type: "reaction",
        cost: 1,
        condition: "",
      },
      target: {
        value: null,
        width: null,
        units: "",
        type: "self",
      },
      range: {
        value: null,
        long: null,
        units: "self",
      },
      actionType: "other",
      weaponType: "natural",
      proficient: true,
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

  console.log("token", token);

  await warpgate.mutate(token.data.document, updates, {}, options); //Let's mutate the token document with some updates(stats changes and active effect on), callbacks(animation function) and options(name).
}

if (args[0] === "off") {
  warpgate.revert(token.data.document, "Rage");
}
