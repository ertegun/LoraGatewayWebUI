var express = require("express");
var router = express.Router();
var shell = require("shelljs");
var moment = require("moment"); // require
router.get("/", function (req, res) {
  // var data = req.app.get("appData");
  // var pagePhotos = [];
  // var pageSpeakers = data.speakers;
  // data.speakers.forEach(function (item) {
  //   pagePhotos = pagePhotos.concat(item.artwork);
  // });
  let data = {
    hostName: "",
    model: "",
    arch: "",
    firmwareVersion: "",
    kernelVersion: "",
    localTime: "",
    upTime: "",
    nodeJSVersion: "",
    totalMemory: "",
    availableMemory: "",
    usedMemory: "",
    bufferedMemory: "",
  };
  try {
    data.hostName = shell.exec("uname -n", { silent: true }).stdout;
    data.model = shell.exec(
      `cat /proc/cpuinfo | grep machine | cut -d ":" -f 2`,
      { silent: true }
    ).stdout;

    data.arch = shell.exec(
      `cat /proc/cpuinfo | grep "system type" | cut -d ":" -f2-`,
      { silent: true }
    ).stdout;
    data.firmwareVersion = shell.exec(
      `cat /etc/openwrt_release | grep DISTRIB_DESCRIPTION | cut -d "'" -f2 | cut -d "'" -f1`,
      { silent: true }
    ).stdout;
    data.kernelVersion = shell.exec(`uname -r`, { silent: true }).stdout;
    // data.localTime = shell.exec(`date`, { silent: true }).stdout;
    data.localTime = moment().format("HH:mm:ss DD.MM.YYYY");
    data.upTime = shell.exec(`uptime`, { silent: true }).stdout;
    data.nodeJSVersion = shell.exec(`node --version`, { silent: true }).stdout;
    data.totalMemory = shell.exec(
      `free | awk '{print $2}' | head -n 2 | tail -n 1`,
      {
        silent: true,
      }
    ).stdout;
    data.availableMemory = shell.exec(
      `free | awk '{print $7}' | head -n 2 | tail -n 1`,
      { silent: true }
    ).stdout;
    data.usedMemory = shell.exec(
      `free | awk '{print $3}' | head -n 2 | tail -n 1`,
      {
        silent: true,
      }
    ).stdout;
    data.bufferedMemory = shell.exec(
      `free | awk '{print $6}' | head -n 2 | tail -n 1`,
      { silent: true }
    ).stdout;
  } catch (error) {
    console.log(error);
  }

  res.render("index", data);
});

module.exports = router;
