import cookies from 'js-cookie';

export const getUserFromCookie = () => {
  const cookie = cookies.get('auth');
  if (!cookie) {
    var obj ={token:null}
    return obj;
  }
  return JSON.parse(cookie);
};
export const setUserCookie = user => {
  cookies.set('auth', user, {
    expires: 1 / 24
  });
};
export const removeUserCookie = () => cookies.remove('auth');

export const getOnBoardFromCookie = () => {
  const cookie = cookies.get('onboarding');
  if (!cookie) {
    return null;
  }
  return (cookie);
};
export const setOnBoardCookie = token => {
  cookies.set('onboarding', token);
};

export const removeOnBoardCookie = () => cookies.remove('onboarding');

export const getOnBoardUserFromCookie = () => {
  const cookie = cookies.get('user');
  if (!cookie) {
    return null;
  }
  return JSON.parse(cookie);
};
export const setOnBoardUserCookie = user => {
  var data = {
    email: user.email,
    name: user.name,
    country:user.country,
    countryCode:user.countryCode,
    phone: user.phone,
    photo: user.imageUrl,
    emailVerifies: user.isEmailVerified,
    isCommitteeMember: user.isCommitteeMember,
    referralCode: user.referralCode,
    currency:user.currency,
    rate:user.rate?user.rate:1
  }
  cookies.set('user', JSON.stringify(data));
};
export const removeOnBoardUserCookie = () => cookies.remove('user');

export const getPaymentDetailCookie = () => {
  const cookie = cookies.get('detail');
  if (!cookie) {
    return null;
  }
  return JSON.parse(cookie);
};
export const setPaymentDetailCookie = (query,isForOther) => { 
  var data = {}
  if(isForOther || isForOther == "true"){
    data = {
        title:query.title,
        event_id: query.event_id,
        tickets: query.tickets,
        slot: query.slot,
        totalAmount: query.totalAmount,
        fees: query.fees,
        isForOther: query.isForOther,
        separateDetails:{
            email:query.separateDetails.email,
            name:query.separateDetails.name,
            phone:query.separateDetails.phone
        },
        paymentType: query.paymentType,
        useWallet: query.useWallet,
        coupon:query.coupon,
    }
  }
  else{
    data = {
      event_id: query.event_id,
      tickets: query.tickets,
      slot: query.slot,
      totalAmount: query.totalAmount,
      fees: query.fees,
      isForOther: query.isForOther,
      paymentType: query.paymentType,
      useWallet: query.useWallet,
      coupon:query.coupon,
    }
  }
  cookies.set('detail', JSON.stringify(data));
};

export const removePaymentDetailCookie = () => cookies.remove('detail');

export const getLocationCookie = () => {
  const cookie = cookies.get('location');
  if (!cookie) {
    return null;
  }
  return JSON.parse(cookie);
};
export const setLocationCookie = add => {
  let data = {
    lat:add.lat,
    lng:add.lng,
    city:add.city,
    state:add.state,
    country:add.country
  }
  cookies.set('location', JSON.stringify(data));
};
export const removeLocationCookie = () => cookies.remove('location');
