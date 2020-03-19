const prod = process.env.NODE_ENV === "production" ;

module.exports ={
  "process.env.BASE_URL": prod ? "https://mohammad-garmabi.now.sh" : "http://localhost:3000" ,
  "process.env.NAMESPACE": "https://mohammad-garmabi.now.sh" ,
  "process.env.CLIENT_ID" : "qiIfWiVHXdjsIVmOMq3P0Fqfjf7GAx4P"
}