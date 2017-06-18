import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  Renderer
} from '@angular/core';

@Component({
  selector: 'dt-toggle-button',
  styleUrls: ['./dt-toggle-button.component.scss'],
  templateUrl : './dt-toggle-button.component.html'
})

export class DtToggleButtonComponent {

  private _classes: String = '';
  @Input('classes')
  public get classes() { return this._classes; }
  public set classes(value) {
    if (this._classes != value) {
      this._classes = value;
    }
  }

  private _sliding: Boolean = false;
  @Input('sliding')
  public get sliding() { return this._sliding; }
  public set sliding(value) {
    if (this._sliding != value) {
      this._sliding = value;
      this.updateClasses();
    }
  }

  private _opened: Boolean = false;
  @Input('opened')
  public get opened() { return this._opened; }
  public set opened(value) {
    if (this._opened != value) {
      this._opened = value;
      this.updateClasses();
    }
  }

  private _selected: Boolean = false;
  @Input('selected')
  public get selected() { return this._selected; }
  public set selected(value) {
    if (this._selected != value) {
      this._selected = value;
      this.updateClasses();
    }
  }

  private _label: string = '';
  @Input('label')
  public get label() { return this._label; }
  public set label(value) {
    if (this._label != value)
      this._label = value;
  }

  constructor(private _element:Renderer) {
    this.updateClasses();
  }

  public updateClasses() : void {
    this.classes = '';
    if (this._selected)
      this.classes += 'selected ';
    if (this._sliding)
      this.classes += this._opened ? 'icon-expand_less ' : 'icon-expand_more ';
  }

  public toggle() : void {
    this._selected = !this._selected;
  }
}
