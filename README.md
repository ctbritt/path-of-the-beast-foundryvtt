# Path of the Beast Weapon Spawning
A Macro to spawn proper Path of the Beast weapons for a barbarian when they rage. 

Requires 
- midi-qol
- advanced macros
- item macro
- warpgate (for mutation of the actor)
- Dfreds Convenient Effects (for basic Rage application)
- Sequencer (for the pretty effects)

You should also have items for the weapons already created in your item directory. I've included uploaded json files for the ones I use.
## Usage instructions
1. Copy the rage_beast.js macro to the Item Macro on the Rage feature. Set it to trigger as a DAE Macro (`Macro.ItemMacro > Custom > @item`). Remove all other active effects from the Rage feature. This will add the appropriate weapons while Dfred's Rage handles the basic Rage effects.
2. Create a four new items in your item directory. (It doesn't matter what you name them.) Right-click on each item and import a .json file for the rage weapons for each new item you created. 

That's it! Now, when you rage, you will get the basic rage effects and, assuming your barbarian follows the Path of the Beast, you will get a popup dialog asking which kind of weapon you wish to manifest. If you don't want to manifest a weapon, just close the dialog window without choosing one. The basic rage effects will be applied but no weapon will be generated. 

If you don't follow the Path of the Beast, you will not see a pop-up dialog, and the basic Rage effects will be applied.
## Notes
I am planning updates to include the weapons json data in the macro itself, so you don't need to import the ones I've uploaded. This will allow me to also check for proper Barbarian level and set the magic tag appropriately. (At 6th level, the rage weapons count as magical for overcoming resistance to non-magical s/b/p damage.)
## Thanks
Thanks to [honeybadger](https://github.com/trioderegion/warpgate) for much patient hand-holding and for writing Warpgate, as well as to [gazkhan](https://github.com/Gazkhan) for their original rage macro that inspired me to expand on this. The animation and basic structure is theirs. 
