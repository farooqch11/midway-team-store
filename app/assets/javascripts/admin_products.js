$(document).on('turbolinks:load', () => {
  const AppBridge = window['app-bridge'];
  const Toast = AppBridge.actions.Toast;
  const createApp = AppBridge.default;
  const apiKey = document.querySelector('meta[name="shopify-api-key"]').getAttribute('content');

  const app = AppBridge.default({
  apiKey: apiKey,
  host: new URLSearchParams(window.location.search).get('host'),
  });


  const { getSessionToken } = window['app-bridge-utils'];

  const canvas = new fabric.Canvas('imageParamsCanvas', {
    preserveObjectStacking: true,
  });
  $("#canvasDrawModal").on("shown.bs.modal", function (e) {
    // console.log(e);
    const btn = $(e.relatedTarget);
    if (btn.length < 1) {
        return;
    }
    const id = btn.attr('data-product-id');
    const modal = $(e.target);

    // initialize fabric
    canvas.clear();

    let imgEl = document.getElementById('product-image-' + id);
    let imgWidth = $(imgEl).prop("naturalWidth"),
        imgHeight = $(imgEl).prop("naturalHeight");

    let logoInfoStr = $(imgEl).attr('data-logo-params'),
        logoBoxHeight = 50,
        logoBoxWidth = 90,
        logoBoxX = 50,
        logoBoxY = 50;

    if (logoInfoStr != "null") {
        let logoInfoJSON = JSON.parse(logoInfoStr);
        // console.log(logoInfoJSON);
        logoBoxHeight = logoInfoJSON.height;
        logoBoxWidth = logoInfoJSON.width;
        logoBoxX = logoInfoJSON.pos_x;
        logoBoxY = logoInfoJSON.pos_y;
    }

    let drawHeight = 600.0,
        ratio = parseFloat(imgHeight) / parseFloat(drawHeight),
        drawWidth = parseFloat(imgWidth) / ratio;

    canvas.setDimensions({
        width: drawWidth,
        height: drawHeight
    });

    let ProductImage = new fabric.Image(imgEl, {
        left: 0,
        top: 0,
        angle: 0,
        opacity: 1,
        scaleX: drawWidth / imgWidth,
        scaleY: drawHeight / imgHeight
    });
    ProductImage.setControlsVisibility({
        bl: false,
        br: false,
        mb: false,
        ml: false,
        mr: false,
        mt: false,
        tl: false,
        mtr: false
    });
    ProductImage.lockMovementX = true;
    ProductImage.lockMovementY = true;
    canvas.add(ProductImage);

    // logo drag box
    let logoBox = new fabric.Rect({
        top: logoBoxY,
        left: logoBoxX,
        width: logoBoxWidth,
        height: logoBoxHeight,
        fill: 'red'
    });

    logoBox.setControlsVisibility({
        bl: true,
        br: true,
        mb: true,
        ml: true,
        mr: true,
        mt: true,
        tl: true,
        mtr: false
    });
    logoBox.on("modified", function () {
        updateLogoBoxInfo(logoBox);
    });
    logoBox.on("moving", function () {
        updateLogoBoxInfo(logoBox);
    });
    logoBox.on("scaling", function () {
        updateLogoBoxInfo(logoBox);
    });
    canvas.add(logoBox);
    canvas.setActiveObject(logoBox);
    modal.modal('handleUpdate');

    $("#testBtn").off("click").on('click', function () {

    });
    $("#saveLogoParams").off("click").on('click', async function (){
        const token = await getSessionToken(app);

        $.ajax({
            url: "/admin/save_logo_params/" + id,
            type: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"), 
            },
            data: {
                info: {
                    pos_y: logoBox.top,
                    pos_x: logoBox.left,
                    width: logoBox.getScaledWidth(),
                    height: logoBox.getScaledHeight()
                }
            },
            error: function () {},
            success: function (res) {
                showToast("Product info saved");
                // renderProductInfo(res);
                console.log(res);
                $(imgEl).attr('data-logo-params', JSON.stringify(res.logo_params));

                $("[data-logo-params-status=" + res.logo_params.product_id + "]").text("Defined").removeClass("label-danger").addClass('label-success');
                modal.modal("hide");
            }
        })
    });
  });

  function updateLogoBoxInfo(logoBox) {
    let info_obj = {
        pos_y: logoBox.top,
        pos_x: logoBox.left,
        width: logoBox.getScaledWidth(),
        height: logoBox.getScaledHeight()
    };

    $("[data-logo-pos-x]").text(info_obj.pos_x);
    $("[data-logo-pos-y]").text(info_obj.pos_y);
    $("[data-logo-width]").text(info_obj.width);
    $("[data-logo-height]").text(info_obj.height);

  }

});
