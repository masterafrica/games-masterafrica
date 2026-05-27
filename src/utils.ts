import moment from "moment";
export const getreadabledate =(date:string)=>{
   return  moment(date).fromNow()
}