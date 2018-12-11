const HDKey = require('hdkey')
const Wallet = require('./index.js')

function MoacHDKey () {
}

/*
 * Horrible wrapping.
 */
function fromHDKey (hdkey) {
  var ret = new MoacHDKey()
  ret._hdkey = hdkey
  return ret
}

MoacHDKey.fromMasterSeed = function (seedBuffer) {
  return fromHDKey(HDKey.fromMasterSeed(seedBuffer))
}

MoacHDKey.fromExtendedKey = function (base58key) {
  return fromHDKey(HDKey.fromExtendedKey(base58key))
}

MoacHDKey.prototype.privateExtendedKey = function () {
  if (!this._hdkey.privateExtendedKey) {
    throw new Error('This is a public key only wallet')
  }
  return this._hdkey.privateExtendedKey
}

MoacHDKey.prototype.publicExtendedKey = function () {
  return this._hdkey.publicExtendedKey
}

MoacHDKey.prototype.derivePath = function (path) {
  return fromHDKey(this._hdkey.derive(path))
}

MoacHDKey.prototype.deriveChild = function (index) {
  return fromHDKey(this._hdkey.deriveChild(index))
}

MoacHDKey.prototype.getWallet = function () {
  if (this._hdkey._privateKey) {
    return Wallet.fromPrivateKey(this._hdkey._privateKey)
  } else {
    return Wallet.fromPublicKey(this._hdkey._publicKey, true)
  }
}

module.exports = MoacHDKey
