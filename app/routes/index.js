var express = require("express");
var router = express.Router();
var shell = require("shelljs");
router.get("/", function (req, res) {
  // var data = req.app.get("appData");
  // var pagePhotos = [];
  // var pageSpeakers = data.speakers;
  // data.speakers.forEach(function (item) {
  //   pagePhotos = pagePhotos.concat(item.artwork);
  // });

  res.render("index", {
    hostName: shell.exec("uname -n", { silent: true }).stdout,
    model: shell.exec(`cat /proc/cpuinfo | grep machine | cut -d ":" -f 2`, {
      silent: true,
    }).stdout,
    arch: shell.exec(
      `cat /proc/cpuinfo | grep "system type" | cut -d ":" -f2-`,
      { silent: true }
    ).stdout,
    firmwareVersion: shell.exec(
      `cat /etc/openwrt_release | grep DISTRIB_DESCRIPTION | cut -d "'" -f2 | cut -d "'" -f1`,
      { silent: true }
    ).stdout,
    kernelVersion: shell.exec(`uname -r`, { silent: true }).stdout,
    localTime: shell.exec(`date`, { silent: true }).stdout,
    upTime: shell.exec(`uptime`, { silent: true }).stdout,
    nodeJSVersion: shell.exec(`node --version`, { silent: true }).stdout,
  });
});

module.exports = router;
