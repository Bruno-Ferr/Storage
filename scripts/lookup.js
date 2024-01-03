const hre = require("hardhat");
const { keccak256 } = hre.ethers

const addr = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'

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

  console.log("############## Package #############################")
  const Package = await hre.ethers.provider.getStorage(addr, '0x4') // B and C are package together in this slot
  //const Package2 = await hre.ethers.provider.getStorage(addr, '0x5'); 

  console.log(`${parseInt(Package)}`)
  const storage = await hre.ethers.getContractAt("Storage", addr);
  let valueB = await storage.getB(); //Bitwise to separate B from C variable bits

  console.log(`${valueB} valor de b`);

  console.log("############## statically sized #############################")
  const Statically = await hre.ethers.provider.getStorage(addr, '0x5') //0x6 e 0x7
  console.log(`${parseInt(Statically)}`)

  console.log("############## dynamically sized #############################")
  const positionDynamicallyArray = hre.ethers.toBeHex(0x8, 2)
  const dynamicallyArrayBase = hre.ethers.zeroPadValue(positionDynamicallyArray, 32); //Posição do array nos slots em hex
  const dynamicallyValue = keccak256(dynamicallyArrayBase); //Posição zero do array

  const nextP = BigInt(dynamicallyValue) + BigInt(1); //Para pegar alguma posição do array; dynamicallyValue + posição no array
  
  const dynamically = await hre.ethers.provider.getStorage(addr, '0x8') //0x8 (é a posição do array) Tamanho do array
  console.log(`${parseInt(dynamically)}`)
}

lookup()