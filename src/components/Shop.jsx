export default function Shop() {
  const products = [
  {
    name: "CSK Jersey 🟡",
    price: "₹399",
    img: "https://m.media-amazon.com/images/I/71tTPAhmqjL._SY741_.jpg",
    link: "https://amzn.to/4rSMBto",
  },
  {
    name: "MI Jersey 🔵",
    price: "₹499",
    img: "https://m.media-amazon.com/images/I/61dGZkA2P-L._SY879_.jpg",
    link: "https://amzn.to/3PFrSfh",
  },
  {
    name: "RCB Jersey 🔴",
    price: "₹379",
    img: "https://m.media-amazon.com/images/I/41OCJznOPJL.jpg",
    link: "https://amzn.to/47n02us",
  },
  {
    name: "KKR Jersey 🟣",
    price: "₹299",
    img: "https://m.media-amazon.com/images/I/71HGzYL2HkL._AC_UL320_.jpg",
    link: "https://amzn.to/41dIei1",
  },
  {
    name: "SRH Jersey 🟠",
    price: "₹399",
    img: "https://m.media-amazon.com/images/I/51U3eM8rvML._AC_UL480_FMwebp_QL65_.jpg",
    link: "https://amzn.to/4szqObF",
  },
  {
    name: "Delhi Capitals Jersey 🔷",
    price: "₹499",
    img: "https://m.media-amazon.com/images/I/51+7K2YiHVL._SX569_.jpg",
    link: "https://amzn.to/40UsOyQ",
  },
  {
    name: "Punjab Kings Jersey 🔴",
    price: "₹999",
    img: "https://m.media-amazon.com/images/I/91Rl8VvbZUL._SX679_.jpg",
    link: "https://amzn.to/4bwfgzI",
  },
  {
    name: "Rajasthan Royals Jersey 💗",
    price: "₹299",
    img: "https://m.media-amazon.com/images/I/41OCJznOPJL.jpg",
    link: "https://amzn.to/47jbPtJ",
  },
  {
    name: "Gujarat Titans Jersey 🔵",
    price: "₹999",
    img: "https://m.media-amazon.com/images/I/71TddscCaPL._SX679_.jpg",
    link: "https://amzn.to/4d3F5IC",
  },
  {
    name: "Lucknow Super Giants Jersey 🟦",
    price: "₹999",
    img: "https://m.media-amazon.com/images/I/41SGh4NjxvL.jpg",
    link: "https://amzn.to/4bJrnIy",
  },

  // Extras (more earning 💰)
  {
    name: "IPL Cap Collection 🧢",
    price: "₹299",
    img: "https://m.media-amazon.com/images/I/61Ri7GuLfiL._AC_UL320_.jpg",
    link: "https://amzn.to/481SNIr",
  },
  {
    name: "Match Snacks Combo 🍿",
    price: "₹199",
    img: "https://m.media-amazon.com/images/I/81j7Ng7BJDL._AC_SR160,134_CB1169409_QL70_.jpg",
    link: "https://amzn.to/47XyE6r",
  }
];

  return (
    <div className="container">
      <h2 className="shop-title">🛒 IPL Fan Shop</h2>

      <div className="shop-grid">
        {products.map((p, i) => (
          <div key={i} className="product-card">
            <img src={p.img} alt={p.name} />

            <h3 className="cardtext">{p.name}</h3>
            <p className="price">{p.price}</p>

            <a href={p.link} target="_blank">
              <button className="btn btn-primary">
                Buy Now
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}