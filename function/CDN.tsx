export default function transferCDN(url:string):string {
  const oss = "darmau-design.hks3.layerstackobjects.com";
  const cdn = "img.darmau.design";
  return url.replace(oss, cdn);
}