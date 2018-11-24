const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')
let color = document.querySelector('#colorBrush')
let painting = false

let colorPaint

let brushSizePaint = document.querySelector('.brush-size-paint')
let brushSizePaintDefault = "1";
let brushSizeEraser = document.querySelector('.brush-size-eraser')
let brushSizeEraserDefault = "1";


let menuToggle = document.querySelector('canvas')
const menu = document.querySelector('.menu')
let tuto = document.querySelector('.tuto')
let pen = document.querySelector('.pen')
let eraser = document.querySelector('.eraser')

let clear = document.querySelector('.button-action p:first-child')
let save = document.querySelector('.button-action p:last-child')

let test1 = true
let test2 = false



/**
 * Resize
 */
/* Resize */
const sizes = {
    width: 800,
    height: 600
}

const resize = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    $canvas.width = sizes.width
    $canvas.height = sizes.height
}

window.addEventListener('resize', resize)
resize()


/**
 * Menu toggle
 */
function MenuToggle(){
    menu.classList.toggle('open')
}

document.addEventListener('keydown', function (_event) {
            //Play pause toggle
            if (_event.keyCode == 9) {
                MenuToggle();
            }
        })




/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0,
    down: false
}



function mouseDown(_event){
    painting = true
    tuto.style.display = "none"
    context.beginPath()
    context.moveTo(cursor.x = _event.clientX, cursor.y = _event.clientY)
}

function mouseMove(_event) {
    if (painting) {
        context.lineTo(cursor.x = _event.clientX, cursor.y = _event.clientY)
        if (test1 === true) {
            test2 === false
            draw()
        } else {
            test1 === false
            Eraser()
        }
    }
}

function mouseUp(_event){
    painting = false
}

$canvas.addEventListener('mousedown', mouseDown, false)
$canvas.addEventListener('mousemove', mouseMove, false)
$canvas.addEventListener('mouseup', mouseUp, false)

$canvas.addEventListener('touchstart', mouseDown, false)
$canvas.addEventListener('touchmove', mouseMove, false)
$canvas.addEventListener('touchend', mouseUp, false)




/**
 * color background
 */

window.addEventListener("load", colorBackground, false);

function colorBackground() {
    colorBrush = document.querySelector("#colorBackground");
    colorBrush.addEventListener("input", updateFirst, false);
    colorBrush.select();
}

function updateFirst(_event) {

    if ($canvas) {
        $canvas.style.backgroundColor = _event.target.value;
    }
}


/**
 * color brush
 */
window.addEventListener("load", colorBrush, false);

function colorBrush() {
    colorBrush = document.querySelector("#colorBrush");
    colorBrush.addEventListener("input", updateTwo, false);
    colorBrush.select();
}

function updateTwo(_event) {

    if ($canvas) {
        colorPaint = _event.target.value;
    }
}

/**
 * Draw
 */
function draw(){
    context.lineWidth = brushSizePaintDefault
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.strokeStyle = colorPaint
    context.stroke()
}
/**
 * Eraser
 */
function Eraser(){
    context.clearRect(cursor.x, cursor.y, brushSizeEraserDefault, brushSizeEraserDefault);
}

/**
 * Brush size paint
 */
function brushSizePaintFonction() {
    brushSizePaintDefault = _event.innerHTML
}
/**
 * Brush size eraser
 */
function brushSizeEraserFonction() {
    brushSizeEraserDefault = _event.innerHTML
}


pen.addEventListener('click', () => {
    test1 = true
    test2 = false
    brushSizePaint.style.display == "block" ? brushSizePaint.style.display = "none" :
        brushSizePaint.style.display = "block";
})
eraser.addEventListener('click', () => {
    test1 = false
    test2 = true
    brushSizeEraser.style.display == "block" ? brushSizeEraser.style.display = "none" :
        brushSizeEraser.style.display = "block";
})


/**
 * Clear canvas
 */
function clear_canvas() {
    context.clearRect(0, 0, sizes.width, sizes.height)
}

clear.addEventListener('click', () => {
    clear_canvas()
})


/**
 * Download canvas .png
 */
save = document.querySelector('.save-image');


function Save(){
    let dataURL = $canvas.toDataURL('image/png');
    save.href = dataURL;
}

save.addEventListener('click', function (_event) {
    Save()
});




/**
 * KeyCode
 */
document.addEventListener('keydown', function (_event) {
    //Play pause toggle
    if (_event.keyCode == 66) {
        draw();
    } else if (_event.keyCode == 69){
        Eraser()
    }
    else if (_event.keyCode == 8){
        clear_canvas()
    }
})