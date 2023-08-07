const CrowdFunding = artifacts.require("CrowdFunding");

module.exports = function (deployer) {
  const targetAmount = 100;
  const campaignDuration = 30; 

  deployer.deploy(CrowdFunding, targetAmount, campaignDuration);
};
