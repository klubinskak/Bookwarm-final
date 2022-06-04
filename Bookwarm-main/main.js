// password confirm
let $uploadfile = $('#register .upload-profile-image input[type="file"]');
$uploadfile.change(function () {
    readURL(this);
});

function confirmPassword(event) {

    var password = document.getElementById('password').value;
    var confirmPwd = document.getElementById('confirm-password').value;
    var error = document.getElementById('error');

    if (password === confirmPwd) {
        return true;
    } else {
        error.textContent = "Passwords does not match";
        event.preventDefault();
    }
}




// profile image

function readURL(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $("#register .upload-profile-image .img").attr('src', e.target.result);
            $("#register .upload-profile-image .camera").css({ display: "none" });
        }

        reader.readAsDataURL(input.files[0]);

    }
}