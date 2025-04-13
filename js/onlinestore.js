$(document).ready(function () {
				//grab data from PHP
				axios({
					method: 'get',
					url: 'https://codethesolution.com/nscc/project2700-lee.php'
				}).then(response => {

					const all_values = response.data;
					console.log(all_values);
					let counter = 1;
					//extract the values and append form data
					all_values.forEach(function (obj) {
						let columnrow = ""
						const title = obj.title;
						const price = obj.price;
						const description = obj.description;
						const image_main = obj.image_main
						const image_large = obj.image_large;
						const image_gallery_1 = obj.image_gallery_1;
						const image_gallery_2 = obj.image_gallery_2;
						const image_gallery_3 = obj.image_gallery_3;

						console.log(`title: ${title}`);
						console.log(`price: ${price}`);
						console.log(`description: ${description}`);
						console.log(`image_main: ${image_main}`);
						console.log(`image_large: ${image_large}`);
						console.log(`image_gallery_1: ${image_gallery_1}`);
						console.log(`image_gallery_2: ${image_gallery_2}`);
						console.log(`image_gallery_3: ${image_gallery_3}`);

						//append form data using the array values
						if (counter == 1) {
							columnrow = "row1col1"
						} else if (counter == 2) {
							columnrow = "row1col2"
						} else if (counter == 3) {
							columnrow = "row1col3"
						} else if (counter == 4) {
							columnrow = "row2col1"
						} else if (counter == 5) {
							columnrow = "row2col2"
						} else if (counter == 6) {
							columnrow = "row2col3"
						};
						$("#productcatalog").append(`
		                    <div class="col-sm-4 ${columnrow} outlines">
		                        <img class="image" src="${image_main}" alt="product${counter}" id="product${counter}">
		                        <h4 class="homearticlepreview"><a href="#" data-bs-toggle="modal" data-bs-target="#product${counter}Modal">${title}</a></h4>
		                        <p style="color:gray" class="homearticlepreview">$${price}</p>
		                        <p>${description}</p>
		                    </div>
		                `);
						$("#productModals").append(`
		                    <div class="modal fade" id="product${counter}Modal">
					            <div class="modal-dialog modal-dialog-centered">
						            <div class="modal-content">
							            <div class="modal-title">
								            <p class="display-6">Product information</p>
								            <p>Product name: ${title}</p>
		                                    <p>Price: $${price}</p>
		                                    <p>Description: ${description}</p>
		                                    <p>Gallery:</p>
		                                    <div>
		                                        <a data-fancybox="gallery" data-src="${image_gallery_1}" data-caption="${description}">
		                                            <img src="${image_gallery_1}" />
		                                        </a>
		                                        <a data-fancybox="gallery" data-src="${image_gallery_2}">
		                                            <img src="${image_gallery_2}" />
		                                        </a>
		                                        <a data-fancybox="gallery" data-src="${image_gallery_3}">
		                                            <img src="${image_gallery_3}" />
		                                        </a>
		                                        <a data-fancybox="gallery" data-src="${image_main}">
		                                            <img src="${image_main}" />
		                                        </a>
		                                        <a data-fancybox="gallery" data-src="${image_large}">
		                                            <img src="${image_large}" />
		                                        </a>
		                                    </div>
		                                    <script type="text/javascript">
		                                        Fancybox.bind('[data-fancybox]', {});
		</script>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-warning" data-bs-dismiss="modal">Add to cart</button>
			<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
		</div>
		</div>
		</div>
		</div>
		`);
		counter = counter + 1;
		});
		}).catch(err => {
		console.log(err);
		});
		});
		function checkFormData() {
		
		//get the data from the form in contact page
		const emailSubject = $("#emailSubject").val();
		const emailAddress = $("#emailAddress").val();
		const messageContent = $("#messageContent").val();
		
		//check for errors
		let errors = 0;
		if ( emailSubject.trim().length === 0 ) {
		errors = 1;
		$("#emailSubjectError").css('display', 'inline-block');
		} else {
		$("#emailSubjectError").css('display', 'none');
		}
		
		if ( emailAddress.trim().length === 0 ) {
		errors = 2;
		$("#emailAddressError").css('display', 'inline-block');
		} else {
		$("#emailAddressError").css('display', 'none');
		}
		
		if ( messageContent.trim().length === 0 ) {
		errors = 3;
		$("#messageContentError").css('display', 'inline-block');
		} else {
		$("#messageContentError").css('display', 'none');
		}
		
		//if there are no errors in the form
		if ( errors == 0) {
		$("body > div.errorDiv").remove();
		
		//collect data to be sent
		const formData = new FormData();
		formData.set('emailSubject', emailSubject);
		formData.set('emailAddress', emailAddress);
		formData.set('messageContent', messageContent);
		
		console.log(`data to be sent: ${emailSubject} ${emailAddress} ${messageContent}`);
		fetchData(formData);
		}
		}
		console.log("Submit button clicked, running checkFormData");
		
		async function fetchData(formData) {
		let response = await axios({
		method: 'post',
		url: 'senddata.php',
		data: formData
		}).catch(e => {
		console.log(`An error has occurred. ${e}`);
		});
		
		//log the response to console
		console.log(`response: ${JSON.stringify(response)}`);
		
		//retrieve all values
		const all_values = response.data.all_values;
		
		//process each entry in an array with $.each
		$.each(all_values, (key, value) => {
		console.log(`key: ${key}, value: ${value}`);
		});
		
		//clear the form values
		$(".errors").css('display', 'none');
		$("#emailSubject").val('');
		$("#emailAddress").val('');
		$("#messageContent").val('');
		
		//Tell the user the form submission was successful
		$("#successMessage").prepend("<div class='successDiv'>The form was submitted successfully.</div>");
		setTimeout(function(){
		$("body > div.successDiv").remove();
		}, 3000);
		
		
		}