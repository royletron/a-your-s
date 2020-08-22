Array.prototype.random = function() {
  return this[Math.floor(this.length*Math.random())]
}

String.prototype.pad = function(size) {
  let s = this;
  while (s.length < size) s = "0" + s;
  return s;
}

const SPORTS = ['football', 'cricket', 'softball', 'squash', 'tennis', 'rugby']
const TOPICS = ['software', 'hardware', 'thoughts', 'discussions']
const BLOGWORDS = ['10-best', 'world', 'leadership', 'report', ...TOPICS, ...SPORTS];

const randPath = (arr, num) => new Array(num).fill().map(() => arr.random()).join('-')

const randDate = () => {
  let y = '20'+['20', '19', '18'].random()
  let m = Math.ceil(Math.random()*12).toString().pad(2);
  let d = Math.ceil(Math.random()*29).toString().pad(2);
  return `${y}-${m}-${d}`
}

class URL {
  constructor(url, parent = null) {
    this.url = url;
    this.parent = parent;
    this.children = [];
    if(parent) {
      this.links=[parent];
      parent.addChild(this);
    }
  }
  addLink(url) {
    this.links.push(url);
  }
  addChild(url) {
    this.children.push(url);
  }
  generateBlog(posts) {
    let topics = [];
    for(var i = 0; i < 3; i++) {
      topics.push(new URL(`/blog/${TOPICS[i]}`, this));
    }
    for(var i = 0; i < posts; i++) {
      let url = new URL(`/blog/${randDate()}-${randPath(BLOGWORDS, Math.ceil(Math.random()*3))}`, this);
      url.addLink(this.parent);
      url.addLink(topics.random());
    }
  }
  toString() {
    console.log(this.url);
    this.children.sort((a, b) => a.url - b.url).forEach(child => child.toString());
  }
}

const generateSitemap = (lvl = 1) => {
  let root = new URL('/');
  let blog = new URL('/blog', root);
  blog.generateBlog(20);
  root.toString();
}


class User {
  constructor() {
    this.requests = [];

  }
}

class Request {
  constructor() {
    this.start = Date.now();
    this.time = 0;
  }
  update(dtx) {
    this.time += dtx;
  }
}

export default class RequestManager {
  constructor() {
    this.requests = [];
    this.gen(4000);
    generateSitemap();
  }
  gen(time) {
    this.nextTick = this.prevgen = time;
  }
  newReq() {}
  update(dtx) {
    this.nextTick += -dtx;
    if (this.nextTick < 0) {
      // console.log("Create!");
    }
  }
}
