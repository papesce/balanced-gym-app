import React, { Component } from 'react'
import './SwipeableItem.css';

interface SwipeableItemProps {
    threshold?: number;
    onSwipe?: any;
}


export default class SwipeableItem extends Component<SwipeableItemProps> {
    listElement: any;
    wrapper: any;
    background: any;
    dragStartX: number = 0;
    left: number = 0;
    dragged: boolean = false;
    startTime: number = 0;
    fpsInterval: number = 0;
    componentDidMount = () => {
        window.addEventListener("mouseup", this.onDragEndMouse);
        window.addEventListener("touchend", this.onDragEndTouch);
      }
    componentWillUnmount = () => {
        window.removeEventListener("mouseup", this.onDragEndMouse);
        window.removeEventListener("touchend", this.onDragEndTouch);
      }
    onDragStartMouse = (evt: any) =>{
        this.onDragStart(evt.clientX);
        window.addEventListener("mousemove", this.onMouseMove);
    }
    onDragStartTouch = (evt: any) => {
        const touch = evt.targetTouches[0];
        this.onDragStart(touch.clientX);
        window.addEventListener("touchmove", this.onTouchMove);

    }
    onDragStart = (clientX: number) => {
        // console.log('on drag start:', clientX);
        this.dragged = true;
        this.dragStartX = clientX;
        this.listElement.className = "ListItem";
        requestAnimationFrame(this.updatePosition);
    }
    onMouseMove = (evt: any) => {
        const left: number = evt.clientX - this.dragStartX;
        // console.log('on mouse move:', left);
        if (left < 0) {
          this.left = left;
        }
      }
    onTouchMove = (evt: any) => {
        const touch = evt.targetTouches[0];
        const left = touch.clientX - this.dragStartX;
        if (left < 0) {
          this.left = left;
        }
      }
    onDragEndMouse = (evt: any) => {
        window.removeEventListener("mousemove", this.onMouseMove);
        this.onDragEnd();
      }
      onDragEndTouch = () => {
        window.removeEventListener("touchmove", this.onTouchMove);
        this.onDragEnd();
      }
      onSwiped = () => {
        if (this.props.onSwipe) {
          this.props.onSwipe();
        }
      }
    onDragEnd = () => {
        if (this.dragged) {
          this.dragged = false;
             
          const threshold = this.props.threshold || 0.9;
          
          const leLeft = this.listElement.offsetWidth * threshold * -1;
          console.log('left vs listElement:', this.left, leLeft)
          if (this.left < leLeft) {
            this.left = -this.listElement.offsetWidth * 2;
            this.onSwiped();
          } else {
            this.left = 0;
          }
          this.listElement.className = "BouncingListItem";
          this.listElement.style.transform = `translateX(${this.left}px)`;
        }
      }
      updatePosition = () => {
        if (this.dragged) requestAnimationFrame(this.updatePosition);
      
        const now = Date.now();
        const elapsed = now - this.startTime;
      
        if (this.dragged && elapsed > this.fpsInterval) {
          this.listElement.style.transform = `translateX(${this.left}px)`;
      
          const opacity: number = Math.abs(this.left) / 100;
          const opacityFixed: string = opacity.toFixed(2);
          if (opacity < 1 && opacityFixed !== this.background.style.opacity) {
            this.background.style.opacity = opacityFixed;
          }
          if (opacity >= 1) {
            this.background.style.opacity = "1";
          }
      
          this.startTime = Date.now();
        }
      }  
    render() {
        return (
            <div>
                <div className="Wrapper" ref={div => (this.wrapper = div)}>
                    <div className="Background" ref={div => (this.background = div)}>
                        <span>Delete</span>
                    </div>
                    <div
                        ref={div => (this.listElement = div)}
                        onMouseDown={this.onDragStartMouse}
                        onTouchStart={this.onDragStartTouch}
                        className="ListItem"
>                   {this.props.children}
                   </div>
                 </div>
                (https://malcoded.com/posts/react-swipeable-list/)
            </div>
        )
    }
}
