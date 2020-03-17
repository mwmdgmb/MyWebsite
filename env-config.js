const prod = process.env.NODE_ENV === "production" ;

module.exports ={
  "process.env.BASE_URL": prod ? "https://mwmdgmb.herokuapp.com" : "http://localhost:3000" ,
  "process.env.NAMESPACE": "https://mwmdgmb.herokuapp.com" ,
  "process.env.CLIENT_ID" : "qiIfWiVHXdjsIVmOMq3P0Fqfjf7GAx4P"
}