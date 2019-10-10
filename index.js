var config = {
    smallBg: './images/mouse.jpg',
    bigBg: './images/mouseBigSize.jpg',
    smallDiv : document.querySelector('#small'),
    bigDiv : document.querySelector('#big'),
    mask: document.querySelector('#mask'),
    smallDivSize: {
        width: 350,
        height: 350
    },
    bigDivSize: {
        width: 500,
        height: 500
    },
    bigImgSize: {
        width: 800,
        height: 800
    }
}

//遮罩层尺寸
var maskSize = {
    width: config.bigDivSize.width / config.bigImgSize.width * config.smallDivSize.width,
    height: config.bigDivSize.height / config.bigImgSize.height * config.smallDivSize.height,
}

function init () {
    initImg();
    
    /**
     * 初始化图片
     */
    function initImg() {
        config.smallDiv.style.background = `url('${config.smallBg}') no-repeat left top /contain`;
        config.bigDiv.style.background = `url('${config.bigBg}') no-repeat left top `;
        
        config.smallDiv.onmouseenter = function () {
            config.mask.style.display = 'block';
            config.mask.style.width = maskSize.width + 'px';
            config.mask.style.height = maskSize.height + 'px';
            config.bigDiv.style.display = 'block';
        }
        config.smallDiv.onmousemove = function (e) {
            var offset = getOffset(e);
            maskMove(offset);
            bigImgShow();
        }

        config.smallDiv.onmouseleave = function () {
            config.mask.style.display = 'none';
            config.bigDiv.style.display = 'none';
        }
    }

    /**
     * 展示放大图片
     */
    function bigImgShow() {
        var bigImgLeft = parseInt(config.mask.style.left) / config.smallDivSize.width * config.bigImgSize.width + 'px'; 
        var bigImgTop = parseInt(config.mask.style.top) / config.smallDivSize.height * config.bigImgSize.height + 'px';
        config.bigDiv.style.backgroundPosition = `-${bigImgLeft} -${bigImgTop}`;
    }

    /**
     * 移动遮罩层
     */
    function maskMove(offset) {
        var left = offset.x - maskSize.width / 2;
        var top = offset.y - maskSize.height / 2;
        if (left <= 0) {
            left = 0
        }
        if (top <= 0) {
            top = 0;
        }
        if (left >= config.smallDivSize.width - maskSize.width) {
            left = config.smallDivSize.width - maskSize.width
        }
        if (top >= config.smallDivSize.height - maskSize.height) {
            top = config.smallDivSize.height - maskSize.height
        }
        config.mask.style.left = left + 'px';
        config.mask.style.top = top + 'px';
    }

    /**
     * 获取鼠标坐标
     * @param {*} e 
     */
    function getOffset(e) {
            var style = getComputedStyle(mask);
            var left = parseInt(style.left);
            var top = parseInt(style.top);   
            return {
                x: e.offsetX + left,
                y: e.offsetY + top
            }
    }
    
}

init();