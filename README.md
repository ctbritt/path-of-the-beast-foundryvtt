# Path of the Beast Complete Macro

A Macro for automating Path of the Beast weapons for a barbarian when they rage.

Requires

- midi-qol
- advanced macros
- item macro
- warpgate (for mutation of the actor)
- Sequencer (for the pretty effects)
- Jb2a — i use the patreon version, but you can use the free version if you modify the marked lines.
- Automated Animations (optional) — I use this for an energy strand overlay for the Rage item.
- _If you have Dfred's convenient effects installed, make sure it is set to not apply to this rage. This handles all aspects of the raging, including extra damage, resistances to damage, and advantages on Strength checks and saves._

# This is a total revamp and now everything, including scaling Rage damage and whether the beastial weapons are magical or not is automated with a click of a button. You no longer need separate items in your items directory, either, as the macro has the data on the items built in.

## Usage instructions

1. Download the Rage.json item
2. Create an item in your items directory. You can name it whatever you want.
3. Right-click on the item you just created and choose `Import Data`.
4. Select the downloaded rage.json item from where you downloaded it.
5. Drag the new Rage item onto your Path of the Beast Barbarian and kick ass.

That's it! Now, when you rage, you will get the basic rage effects and, assuming your barbarian follows the Path of the Beast, you will get a popup dialog asking which kind of weapon you wish to manifest. If you don't want to manifest a weapon, just close the dialog window without choosing one. The basic rage effects will be applied but no weapon will be generated.

If you don't follow the Path of the Beast, you will not see a pop-up dialog, and the basic Rage effects will be applied.

## Notes

This update will automatically scale the rage damage based on the barbarian levels you have, as well as correctly determine if the manifested weapons should do magical damage or not. (At 6th level, the rage weapons count as magical for overcoming resistance to non-magical s/b/p damage.)

The `rage_beast.js` macro is included for reference only. It's already embedded in the .json file of the Rage item.

## Many thanks!

Thanks to [honeybadger](https://github.com/trioderegion/warpgate) for much patient hand-holding and for writing Warpgate, as well as to [gazkhan](https://github.com/Gazkhan) for their original rage macro that inspired me to expand on this. The animation and basic structure is theirs. And a very special thanks to [jbowensii](https://github.com/jbowensii/More-Automated-Spells-Items-and-Feats), who pretty much wrote the healing macro embedded in the bite item, completing this project. Thanks to everyone! 
