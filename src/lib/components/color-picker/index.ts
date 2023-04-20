export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export default class Picker {
  target: HTMLCanvasElement;
  width: number;
  height: number;
  context: CanvasRenderingContext2D;

  pickerCircle: { x: number; y: number; width: number; height: number };
  onChangeCallback: ((color: ColorRGB) => unknown) | undefined;

  constructor(target: HTMLCanvasElement, width: number, height: number) {
    this.target = target;
    this.width = width;
    this.height = height;
    this.target.width = width;
    this.target.height = height;
    const tc = this.target.getContext('2d');
    //Get context
    if (tc === null) {
      throw Error('获取不到Canvas上下文');
    }
    this.context = tc;
    //Circle
    this.pickerCircle = { x: 10, y: 10, width: 7, height: 7 };

    this.listenForEvents();
  }

  draw() {
    this.build();
  }

  build() {
    let gradient = this.context.createLinearGradient(0, 0, this.width, 0);

    //Color Stops
    gradient.addColorStop(0, 'rgb(255, 0, 0)');
    gradient.addColorStop(0.15, 'rgb(255, 0, 255)');
    gradient.addColorStop(0.33, 'rgb(0, 0, 255)');
    gradient.addColorStop(0.49, 'rgb(0, 255, 255)');
    gradient.addColorStop(0.67, 'rgb(0, 255, 0)');
    gradient.addColorStop(0.84, 'rgb(255, 255, 0)');
    gradient.addColorStop(1, 'rgb(255, 0, 0)');
    //Fill it
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.width, this.height);

    //Apply black and white
    gradient = this.context.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.width, this.height);

    //Circle
    this.context.beginPath();
    this.context.arc(
      this.pickerCircle.x,
      this.pickerCircle.y,
      this.pickerCircle.width,
      0,
      Math.PI * 2
    );
    this.context.strokeStyle = 'black';
    this.context.stroke();
    this.context.closePath();
  }

  listenForEvents() {
    let isMouseDown = false;
    const onMouseDown = (e: MouseEvent) => {
      const currentX = e.clientX - this.target.offsetLeft;
      const currentY = e.clientY - this.target.offsetTop;
      if (
        currentY > this.pickerCircle.y &&
        currentY < this.pickerCircle.y + this.pickerCircle.width &&
        currentX > this.pickerCircle.x &&
        currentX < this.pickerCircle.x + this.pickerCircle.width
      ) {
        isMouseDown = true;
      } else {
        this.pickerCircle.x = currentX;
        this.pickerCircle.y = currentY;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isMouseDown) {
        const currentX = e.clientX - this.target.offsetLeft;
        const currentY = e.clientY - this.target.offsetTop;
        this.pickerCircle.x = currentX;
        this.pickerCircle.y = currentY;
      }
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    //Register
    this.target.addEventListener('mousedown', onMouseDown);
    this.target.addEventListener('mousemove', onMouseMove);
    this.target.addEventListener('onclick', () => {
      this.onChangeCallback?.(this.getPickedColor());
    });

    document.addEventListener('mouseup', onMouseUp);
  }

  getPickedColor(): ColorRGB {
    const imageData = this.context.getImageData(this.pickerCircle.x, this.pickerCircle.y, 1, 1);
    return { r: imageData.data[0], g: imageData.data[1], b: imageData.data[2] };
  }

  onChange(callback: (color: ColorRGB) => unknown) {
    this.onChangeCallback = (color) => {
      this.draw();
      callback(color);
    };
  }
}
