class Product {
  constructor (id, name, type, price, rating, warranty_years, available) {
    this._id = id
    this.name = name
    this.type = type
    this.price = price
    this.rating = rating
    this.warranty_years = warranty_years
    this.available = available
  }
}
module.exports = Product
