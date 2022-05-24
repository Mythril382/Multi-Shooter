Events.on(ClientLoadEvent, () => {
  //setup settings
  Vars.ui.settings.addCategory("@setting.multi-shooter", Icon.turret, category => {
    category.checkPref("multi-shooter-enabled", true);
    category.sliderPref("multi-shooter-shots", 10, 1, 100, s => s + "");
    category.sliderPref("multi-shooter-shot-delay", 5, 1, 100, s => s + "");
    category.checkPref("multi-shooter-apply-to-units", true);
    category.checkPref("multi-shooter-apply-to-turrets", true);
  });
  
  //if enabled or not
  if (Core.settings.getBool("multi-shooter-enabled", true)) {
    if (Core.settings.getBool("multi-shooter-apply-to-units", true)) {
      //modify shots and shot delay for all units
      Vars.content.units().each(u => u.weapons.each(w => {
        w.shoot.shots = Core.settings.getInt("multi-shooter-shots", 10);
        w.shoot.shotDelay = Core.settings.getInt("multi-shooter-shot-delay", 5);
      }));
    }
    if (Core.settings.getBool("multi-shooter-apply-to-turrets", true)) {
      //modify shots and shot delay for all turrets
      Vars.content.blocks().each(b => b instanceof Turret, b => {
        b.shoot.shots = Core.settings.getInt("multi-shooter-shots", 10);
        b.shoot.shotDelay = Core.settings.getInt("multi-shooter-shot-delay", 5);
      });
    }
  }
});
