if (!workflow.actor || !workflow.token) return;
let effect = chrisPremades.helpers.findEffect(workflow.actor, "Concentrating");
if (effect) chrisPremades.helpers.removeEffect(effect);
let featureData = await chrisPremades.helpers.getItemFromCompendium(
  "chris-premades.CPR Class Feature Items",
  "Rage - End",
  false
);
if (!featureData) return;
featureData.system.description.value = chrisPremades.helpers.getItemDescription(
  "CPR - Descriptions",
  "Rage - End"
);
async function effectMacro() {
  await warpgate.revert(token.document, "Rage");
  await Sequencer.EffectManager.endEffects({ name: "Rage", object: token });
  new Sequence()
    .animation()
    .on(token)
    .opacity(1)

    .play();
}
async function effectMacro2() {
  await chrisPremades.macros.rage.animationStart(token, origin);
}
let effectData = {
  changes: [
    {
      key: "flags.midi-qol.advantage.ability.check.str",
      mode: 0,
      value: "1",
      priority: 0,
    },
    {
      key: "flags.midi-qol.advantage.ability.save.str",
      mode: 0,
      value: "1",
      priority: 0,
    },
    {
      key: "system.traits.dr.value",
      mode: 0,
      value: "slashing",
      priority: 20,
    },
    {
      key: "system.traits.dr.value",
      mode: 0,
      value: "piercing",
      priority: 20,
    },
    {
      key: "system.traits.dr.value",
      mode: 0,
      value: "bludgeoning",
      priority: 20,
    },
    {
      key: "system.bonuses.mwak.damage",
      mode: 2,
      value: "+ @scale.barbarian.rage-damage",
      priority: 20,
    },
    {
      key: "flags.midi-qol.fail.spell.vocal",
      value: "1",
      mode: 0,
      priority: 20,
    },
    {
      key: "flags.midi-qol.fail.spell.somatic",
      value: "1",
      mode: 0,
      priority: 20,
    },
    {
      key: "flags.midi-qol.fail.spell.material",
      value: "1",
      mode: 0,
      priority: 20,
    },
  ],
  duration: {
    seconds: 60,
  },
  icon: workflow.item.img,
  label: workflow.item.name,
  origin: workflow.item.uuid,
  flags: {
    effectmacro: {
      onDelete: {
        script: chrisPremades.helpers.functionToString(effectMacro),
      },
      onCreate: {
        script: chrisPremades.helpers.functionToString(effectMacro2),
      },
    },
    "chris-premades": {
      vae: {
        button: featureData.name,
      },
    },
  },
};
// Define weapon if no weapon will be chosen later.
let weapon = "";
const barbarianClass = actor.classes?.barbarian;
if (!barbarianClass) {
  ui.notifications.warn("You are not a barbarian!");
  return;
}
const subClass = barbarianClass.subclass.name;
const level = barbarianClass.system.levels;
let mgcProp = level > 5 ? true : false;

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
    },
  ],

  flags: {
    "custom-character-sheet-sections": {
      sectionName: "Rage",
    },
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
            '/*****\nForm of the Beast: Bite\n\nUSEAGE : AUTOMATED\nThis item should be placed on the character that has Psionic Power: Psychic Whispers\n\nYour mouth transforms into a bestial muzzle or great mandibles (your choice). It deals 1d8 piercing damage on a hit. Once on each of your turns when you damage a creature with this bite, you regain a number of hit points equal to your proficiency bonus, provided you have less than half your hit points when you hit.\n\nv0.1 April 25 2022 jbowens #0415 (Discord) https://github.com/jbowensii/More-Automated-Spells-Items-and-Feats.git\n*****/\n// did it hit?\nif (workflow.hitTargets.size < 1) return;\n// who\'s who?\nconst thisItem = await fromUuid(args[0].itemUuid);\nconst pcToken = token;\nconst pcActor = token.actor;\n\n// check character current hp > 1/2 max hp return\nconst halfHP = actor.system.attributes.hp.max / 2;\nconst currentHP = actor.system.attributes.hp.value;\n\nif (currentHP >= halfHP) return;\n\n// test and set combat flag for use once per round if in combat\nif (game.combat) {\n  const combatTime = `${game.combat.id}-${\n    game.combat.round + game.combat.turn / 100\n  }`;\n\n  console.log("combatTime:", combatTime);\n\n  const lastTime = actor.getFlag("midi-qol", "beastBite");\n  if (combatTime === lastTime) return;\n  // already used Beast Bite this round return\n  else await actor.setFlag("midi-qol", "beastBite", combatTime);\n}\n\n// get character proficiency bonus and heal that amount\nconst healAmount = actor.system.attributes.prof;\nawait MidiQOL.applyTokenDamage(\n  [{ damage: healAmount, type: "healing" }],\n  healAmount,\n  new Set([pcToken]),\n  thisItem,\n  new Set()\n);\n\nreturn;',
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
      "value": "<p><strong>Bite.</strong> Your mouth transforms into a bestial muzzle or great mandibles (your choice). It deals 1d8 + [[@abilities.str.mod]] piercing damage on a hit. Once on each of your turns when you damage a creature with this bite, you regain a number of hit points equal to your proficiency bonus, provided you have fewer than half your hit points when you hit.</p>",
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
    properties: {
      mgc: mgcProp,
    },
  },
};
let claws = {
  name: "Form of the Beast: Claws",
  type: "weapon",
  img: "icons/commodities/claws/claws-white.webp",
  system: {
    description: {
      "value": "<p><strong>Claws.</strong> Each of your hands transforms into a claw, which you can use as a weapon if it’s empty. It deals 1d6 + [[@abilities.str.mod]] slashing damage on a hit. Once on each of your turns when you attack with a claw using the Attack action, you can make one additional claw attack as part of the same action.</p><p></p>",
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
    properties: {
      mgc: mgcProp,
    },
  },
  flags: {
    "custom-character-sheet-sections": {
      sectionName: "Rage",
    },
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
      "value": "<p><strong>Tail.</strong> You grow a lashing, spiny tail, which deals 1d8 + [[@abilities.str.mod]]  piercing damage on a hit and has the reach property.</p>",
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
    properties: {
      mgc: mgcProp,
    },
  },
  flags: {
    "custom-character-sheet-sections": {
      sectionName: "Rage",
    },

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
    "custom-character-sheet-sections": {
      sectionName: "Rage",
    },

    favtab: {
      isFavorite: true,
    },
    "tidy5e-sheet": {
      favorite: true,
    },
  },
  system: {
    description: {
      "value": "<p><strong>Tail Swipe.</strong> If a creature you can see within 10 feet of you hits you with an attack roll, you can use your reaction to swipe your tail and roll [[/r 1d8]], applying a bonus to your AC equal to the number rolled, potentially causing the attack to miss you.</p>",
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
    properties: {
      mgc: mgcProp,
    },
  },
};

// Check if correct subclass is in place
if (subClass === "Path of the Beast") {
  const buttonData = {
    buttons: [
      {
        label:
          "<a title='Your mouth transforms into a bestial muzzle or great mandibles (your choice). It deals 1d8 piercing damage on a hit. Once on each of your turns when you damage a creature with this bite, you regain a number of hit points equal to your proficiency bonus, provided you have less than half your hit points when you hit.' alt='Your mouth transforms into a bestial muzzle or great mandibles (your choice). It deals 1d8 piercing damage on a hit. Once on each of your turns when you damage a creature with this bite, you regain a number of hit points equal to your proficiency bonus, provided you have less than half your hit points when you hit.'>Bite</a>",
        value: bite,
      },
      {
        label:
          "<a title='Each of your hands transforms into a claw, which you can use as a weapon if it’s empty. It deals 1d6 slashing damage on a hit. Once on each of your turns when you attack with a claw using the Attack action, you can make one additional claw attack as part of the same action.' alt='Each of your hands transforms into a claw, which you can use as a weapon if it’s empty. It deals 1d6 slashing damage on a hit. Once on each of your turns when you attack with a claw using the Attack action, you can make one additional claw attack as part of the same action.'>Claws</a>",
        value: claws,
      },
      {
        label:
          "<a title='You grow a lashing, spiny tail, which deals 1d8 piercing damage on a hit and has the reach property. If a creature you can see within 10 feet of you hits you with an attack roll, you can use your reaction to swipe your tail and roll a d8, applying a bonus to your AC equal to the number rolled, potentially causing the attack to miss you.' alt='You grow a lashing, spiny tail, which deals 1d8 piercing damage on a hit and has the reach property. If a creature you can see within 10 feet of you hits you with an attack roll, you can use your reaction to swipe your tail and roll a d8, applying a bonus to your AC equal to the number rolled, potentially causing the attack to miss you.'>Tail</a>",
        value: [tail, tailSwipe],
      },
    ],
    title: "Which Form of the Beast?",
    content: `<p><img src="https://www.dndbeyond.com/avatars/thumbnails/13710/613/420/618/637402706646069197.png" height="100" style="float:left;outline:0;border:0;vertical-align:middle;margin:0px 10px">When you enter your rage, you can transform, revealing the bestial power within you. Until the rage ends, you manifest a natural weapon. It counts as a simple melee weapon for you, and you add your Strength modifier to the attack and damage rolls when you attack with it, as normal.</p>
	<p>You choose the weapon’s form each time you rage:</p>`,
  };
  weapon = await warpgate.buttonDialog(buttonData);
}
console.log("weapon:", weapon);

if (Array.isArray(weapon)) {
  let [weapon1, weapon2] = weapon;
  updates = {
    embedded: {
      Item: {
        [featureData.name]: featureData,
        [weapon1.name]: weapon1,
        [weapon2.name]: weapon2,
      },
      ActiveEffect: {
        [effectData.label]: effectData,
      },
    },
  };
} else if (!weapon) {
  updates = {
    embedded: {
      Item: {
        [featureData.name]: featureData,
      },
      ActiveEffect: {
        [effectData.label]: effectData,
      },
    },
  };
} else {
  updates = {
    embedded: {
      Item: {
        [featureData.name]: featureData,
        [weapon.name]: weapon,
      },
      ActiveEffect: {
        [effectData.label]: effectData,
      },
    },
  };
}

let options = {
  permanent: false,
  name: "Rage",
  description: featureData.name,
};
await warpgate.mutate(workflow.token.document, updates, {}, options);
async function end({
  speaker,
  actor,
  token,
  character,
  item,
  args,
  scope,
  workflow,
}) {
  if (!workflow.actor) return;
  let effect = chrisPremades.helpers.findEffect(workflow.actor, "Rage");
  if (!effect) return;
  await chrisPremades.helpers.removeEffect(effect);
}
async function attack({
  speaker,
  actor,
  token,
  character,
  item,
  args,
  scope,
  workflow,
}) {
  //todo: Automate keeping track of attacks and being attacked.
}
async function attacked({
  speaker,
  actor,
  token,
  character,
  item,
  args,
  scope,
  workflow,
}) {}
async function animationStart(token, origin) {
  //Animations by: eskiemoh
  let animation =
    new Sequence()

      .effect()
      .file("jb2a.extras.tmfx.outpulse.circle.02.normal")
      .atLocation(token)
      .size(4, { gridUnits: true })
      .opacity(0.25)

      .effect()
      .file("jb2a.impact.ground_crack.orange.02")
      .atLocation(token)
      .belowTokens()
      .filter("ColorMatrix", { hue: -15, saturate: 1 })
      .size(3.5, { gridUnits: true })
      .zIndex(1)

      .effect()
      .file("jb2a.impact.ground_crack.still_frame.02")
      .atLocation(token)
      .belowTokens()
      .fadeIn(1000)
      .filter("ColorMatrix", { hue: -15, saturate: 1 })
      .size(3.5, { gridUnits: true })
      .zIndex(0)
      .duration(8000)
      .fadeOut(3000)

      .effect()
      .file("jb2a.wind_stream.white")
      .atLocation(token, { offset: { y: -0.05 }, gridUnits: true })
      .size(1.75, { gridUnits: true })
      .rotate(90)
      .opacity(0.9)
      .filter("ColorMatrix", { saturate: 1 })
      .tint("#FF0000")
      .loopProperty("sprite", "position.y", {
        from: -5,
        to: 5,
        duration: 50,
        pingPong: true,
      })
      .duration(8000)
      .fadeOut(3000)

      .effect()
      .file("jb2a.particles.outward.orange.01.03")
      .atLocation(token)
      .scaleToObject(2.5)
      .opacity(1)
      .fadeIn(200)
      .fadeOut(3000)
      .loopProperty("sprite", "position.x", {
        from: -5,
        to: 5,
        duration: 50,
        pingPong: true,
      })
      .animateProperty("sprite", "position.y", {
        from: 0,
        to: -100,
        duration: 6000,
        pingPong: true,
        delay: 2000,
      })
      .duration(8000)

      .effect()
      .file("jb2a.wind_stream.white")
      .atLocation(token)
      .name("Rage")
      .attachTo(token)
      .scaleToObject()
      .rotate(90)
      .opacity(1)
      .filter("ColorMatrix", { saturate: 1 })
      .tint("#FF0000")
      .persist()
      .private()

      .effect()
      .file("jb2a.token_border.circle.static.orange.012")
      .atLocation(token)
      .name("Rage")
      .attachTo(token)
      .opacity(0.6)
      .scaleToObject(1.9)
      .filter("ColorMatrix", { saturate: 1 })
      .tint("#FF0000")
      .persist()

      .play();
}
async function animationEnd(token, origin) {
  await Sequencer.EffectManager.endEffects({ name: "Rage", object: token });
  new Sequence()
    .animation()
    .on(token)
    .opacity(1)

    .play();
}
