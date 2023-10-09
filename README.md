# Path of the Beast Complete Macro

A Macro for automating Path of the Beast weapons for a barbarian when they rage.

Requires

- [Chris Premades](https://github.com/chrisk123999/chris-premades/tree/master) and dependencies
- [MidiQOL](https://gitlab.com/tposney/midi-qol) and dependencies
- [Warpgate](https://github.com/trioderegion/warpgate) (for mutation of the actor)
- [DDB Importer](https://github.com/mrprimate/ddb-importer)
- _If you have Dfred's convenient effects installed, make sure it is set to not apply to this rage. This handles all aspects of the raging, including extra damage, resistances to damage, and advantages on Strength checks and saves._

Optional: If you have [Custom Character Sheet Sections](https://github.com/jessev14/custom-character-sheet-sections) installed, this will put the Rage beast weapons as well as the _Rage - End_ feature from Chris Premades into a section called "Rage."
# This is a total revamp and all the modules and their dependencies listed above are _hard_ requirements. Everything now, including scaling Rage damage and whether the beastial weapons are magical or not is automated with a click of a button. You no longer need separate items in your items directory, either, as the macro has the data on the items built in.

## Installiation instructions

1. Download the _fvtt item rage.json_ item
2. Add a rage damage scale on your Barbarian class advancement sheet. Use `@scale.barbarian.rage-damage` for the identifier. If you have imported your Path of the Beast subclass using DDB-Importer, this is already done for you.
3. Create an *item* in your items directory. You can name it whatever you want. (It's important you create it as an _item_)
4. Right-click on the item you just created and choose `Import Data`.
5. Select the downloaded rage.json item from where you downloaded it.
6. Drag the new Rage item onto your Path of the Beast Barbarian and kick ass.

If you have the excellent module [directory-json-drop](https://github.com/xaukael/directory-json-drop/), you can simply drag the _fvtt item rage.json_ file from your file manager or finder onto the sidebar and you'll be done. 

That's it! Now, when you rage, you will get the basic rage effects and, assuming your barbarian follows the Path of the Beast, you will get a popup dialog asking which kind of weapon you wish to manifest. If you don't want to manifest a weapon, just close the dialog window without choosing one. The basic rage effects will be applied but no weapon will be generated.

If you don't follow the Path of the Beast, you will not see a pop-up dialog, and the basic Rage effects will be applied.

## Notes
This update will automatically scale the rage damage based on the barbarian levels you have, as well as correctly determine if the manifested weapons should do magical damage or not. (At 6th level, the rage weapons count as magical for overcoming resistance to non-magical s/b/p damage.)

The `rage_beast.js` macro and the weapon items are included for reference only. They're already embedded in the .json file of the Rage item. You only need to add the _Rage_ item to your character sheet and you're done.

## Many thanks!

Thanks to [Chris](https://github.com/chrisk123999), [Tim Posney](https://gitlab.com/tposney), [thatlonelybugbear](https://github.com/thatlonelybugbear), [moto moto](https://github.com/MotoMoto1234), and everyone else on the Midi discord. Also thanks to [honeybadger](https://github.com/trioderegion/warpgate) for much patient hand-holding and for writing Warpgate, as well as to [gazkhan](https://github.com/Gazkhan) for their original rage macro that inspired me to expand on this. And a very special thanks to [jbowensii](https://github.com/jbowensii/More-Automated-Spells-Items-and-Feats), who pretty much wrote the healing macro embedded in the bite item, completing this project. Thanks to everyone!
