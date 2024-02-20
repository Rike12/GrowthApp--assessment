
let COUNTRY;
// Function to retrieve visitor information
async function getVisitorInformation() {
    const visitorInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        country:   await getUserCountry(),
        deviceType: getDeviceType()

    };

    return visitorInfo;
}



async function getUserCountry (){
    // Check if Geolocation is supported
if (navigator.geolocation) {

    try {
    let position = await new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const limit =1 ;
        const API_key = "4f6c8a99c1d863ba5e150e2b0cf451b2"
        const URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${API_key}`

        let res = await fetch(URL);
        let data = await res.json()
        console.log(data[0].country)
        return data[0].country
    } catch (error) {
        console.log("Geolocation is not supported by this browser.");
    }

} else {
    console.log("Geolocation is not supported by this browser.");
    return
}

}


function getDeviceType() {
    const userAgent = navigator.userAgent;
    const screenWidth = window.screen.width;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad/i.test(userAgent);
    
    if (isMobile || isTablet || screenWidth < 768) {
        return 'Mobile';
    } else if (screenWidth < 992) {
        return 'Tablet';
    } else {
        return 'Desktop';
    }
}

async function sendUserDetails(userDetails){
    try {
    
    const assessmentUrl = "https://tikka-lite.onrender.com/assessment"
    const response = await fetch(assessmentUrl, {
    method: 'POST',
    hedaer: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(userDetails)
  })
  const data = await response.json()
      console.log("data",data)
} catch (error) {
    console.log("Error", error)
}
}

window.addEventListener("DOMContentLoaded", async ()=>{

    const visitorInfo = await getVisitorInformation();
    sendUserDetails(visitorInfo)
    console.log(visitorInfo);
})