class Post {
  constructor(title) {
    this.title = title
    this.date = new Date()
  }
  toString() {
    return JSON.stringify(value: {
      title: this.title,
      date: this.date.toJSON()
    })
  }
}