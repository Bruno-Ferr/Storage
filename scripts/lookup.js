const hre = require("hardhat");
const { keccak256 } = hre.ethers

const addr = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'

async function lookup() {
  const valueX = await hre.ethers.provider.getStorage(addr, '0x1')

  console.log(parseInt(valueX))
  console.log("############## Mapping #############################")

  const keyHex = hre.ethers.toBeHex(1, 2);
  const key = hre.ethers.zeroPadValue(keyHex, 32)
  const baseSlotHex = hre.ethers.toBeHex(0x2, 2)
  const baseSlot = hre.ethers.zeroPadValue(baseSlotHex, 32).slice(2);
  
  const slot = keccak256(key + baseSlot)
  console.log(slot)
  const valueM = await hre.ethers.provider.getStorage(addr, slot)

  console.log(parseInt(valueM))
  console.log("############## Should be at position 0x2 or 0x3? #############################")

  const valueZ = await hre.ethers.provider.getStorage(addr, '0x3')

  console.log(`${parseInt(valueZ)} 0x3!`)
}

lookup()