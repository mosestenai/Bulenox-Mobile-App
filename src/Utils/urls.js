import React from "react";
//youverify baseurl
const youverifybase = "https://api.sandbox.youverify.co"
const onlinebase = "https://api.bulenox-coupons.app/"

const localbase = "http://192.168.1.7:8000/"

const baseurl = onlinebase

export const base_url = `${baseurl}api/`;

//common links
//register mini user
export const Registerminiuserurl = base_url + 'registerminiuser'
//register first time user
export const Registerfirsttimeuserurl = base_url + "registerfirsttimeuser"
//verify register code
export const Verifyregistercodeurl = base_url + "verifyregistercode"
//fetch app settings
export const Fetchappsettingsurl = base_url + "fetchsystemdefaults"


//user Create account url
export const Registeruserurl = base_url + "register";
//user login url
export const Loginuserurl = base_url + "login";
//user updateuserinfo url
export const Updateuserinfourl = base_url + "updateuserinfo";
//saveexpotokenurl
export const Saveexpotokenurl = base_url + "saveexpotoken";
//sync user data
export const Syncuserdataurl = base_url + "syncuserdetails";
//send reset pass request
export const Sendrequestpassurl = base_url + "requestpasschange";
//validate reset passcode
export const Validatepasscodeurl = base_url + "validatepasscode"
//validate reset passcode
export const Resetpassurl = base_url + "resetpassword"
//delete account
export const Deleteaccounturl = base_url + "deleteaccount"
//restoreaccount
export const Restoreaccounturl = base_url + "restoreuser"

//post image
export const Postimageurl = base_url + "uploadpic"

//fetch assets url
export const Fetchassetsurl = baseurl + "assets/"



//products
export const Productimagesurl = base_url + "products/images/"
export const Fetchproductsurl = base_url + "products/fetch-products"
export const Fetchbrandsurl = base_url + "products/fetch-brands"
export const Fetchsingleproducturl = base_url + "products/fetch-single-product"
export const Viewproducturl = base_url + "products/view-product"
export const Copyproducturl = base_url + "products/copy-product"

/*Inbox*/
//fetch messages
export const Fetchmessagesurl = base_url + "fetchmymessages"
//read message
export const Readmessageurl = base_url + "readmessage"


/**Issues */
//post issue 
export const Postissueurl = base_url + "postissue"

/**Yu verify */
//verify user ID info
export const Verifyuseridurl = youverifybase + "/v2/api/identity/ke/national-id"
























