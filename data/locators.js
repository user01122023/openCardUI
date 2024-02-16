export const loginLocators = {
    email: "//input[@name='email']",
    password: "//input[@name='password']",
    submit: "//input[@type='submit']"
}

export const itemMacBook = "//button[@onclick=\"cart.add('43');\"]"
export const item2 = "//button[@onclick='cart.add('40');']";

export const successItemAddMessage = '//*[contains(text(),"Success: You have added")]'
// export const itemInTheCart = `(//a[contains(text(),'${itemName}')])[2]`

export const quantityValue = "//input[contains(@name,'quantity')]"
export const updateQuantity = "//button[@data-original-title='Update']"

export const successItemUpdateMessage = "//*[@class='alert alert-success alert-dismissible']"
export const removeItemFromCart="//*[@data-original-title='Remove']"
//export const emptyCart="//*[@id='content']"
export const emptyCart="(//p[contains(text(),'Your shopping cart is empty!')])[2]"
export const addToCart = "//*[@id='button-cart']"
export const couponCodeInput = "//input[@id='input-coupon']"
export const couponCodeApply = "//input[@id='button-coupon']"
export const couponApplyMessage = "//div[@class='alert alert-success alert-dismissible']"
export const useCoupon = "//a[@href='#collapse-coupon']"
