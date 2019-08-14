const Pauseable = artifacts.require("Pauseable");

module.exports = function(deployer) {
  deployer.deploy(Pauseable);
};
