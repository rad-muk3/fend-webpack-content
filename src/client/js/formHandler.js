function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    //checkForName(formText)
	if(checkURL(formText)) {
		console.log("::: Data Posted :::")
        // check what text was put into the form field
		console.log("::: Form Submitted :::")
        Client.postData('http://localhost:8080/sentiment', {url: formText}).then(function (data) {
          Client.postData("http://localhost:8080/add", {
			  url: formText,
			  text: data.text,
			  polarity: data.polarity,
			  subjectivity: data.subjectivity,
			  polarity_confidence: data.polarity_confidence
          } )
        }).then(updateUI);
    } else {
      alert('Invalid URL. Please try again.')
    }
}

//Update the UI Elements
const updateUI = async () => {
    const request = await fetch("http://localhost:8080/all");
    try {
		  const data_analyse = await request.json();
		  document.getElementById("url").innerHTML = `URL: ${data_analyse.url}`
		  document.getElementById("text").innerHTML = `TEXT: ${data_analyse.text}`;
		  document.getElementById("polarity").innerHTML = `POLARITY: ${data_analyse.polarity}`;
		  document.getElementById("subjectivity").innerHTML = `SUBJECTIVITY: ${data_analyse.subjectivity}`;
		  document.getElementById("polarity_confidence").innerHTML = `POLARITY_CONFIDENCE: ${data_analyse.polarity_confidence}`;

    } catch (error) {
          console.log("error", error);
    }
};

//Check for a valid URL. I referred to the following link to get 
// this idea: https://www.tutorialspoint.com/How-to-validate-URL-address-in-JavaScript
function checkURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

export { handleSubmit }
export { updateUI }
export { checkURL }
