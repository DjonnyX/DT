import { Component, trigger, state, style, transition, Injectable, keyframes, animate, EventEmitter, Input, Output, ViewEncapsulation, ElementRef } from '@angular/core';

@Component({
  selector: 'dt-toggle-panel',
  styleUrls: ['./dt-toggle-panel.component.scss'],
  templateUrl : './dt-toggle-panel.component.html',
  animations: [trigger('collapse', [
        state('collapsed', style({'margin-top': '-100%'}) ),
        state('expanded', style({'margin-top': '0%'}) ),
        transition('collapsed => expanded', [
          animate('.25s ease-out', style({'margin-top': '0%'}))
        ]),
        transition('expanded => collapsed', [
          animate('.25s ease-in', style({'margin-top': '-100%'}))
        ])
      ])
  ],
  encapsulation: ViewEncapsulation.None
})

@Injectable()
export class DtTogglePanelComponent {

  static COLLAPSED:string = 'collapsed';
  static EXPANDED:string = 'expanded';

  @Output()
  opened:EventEmitter<Boolean> = new EventEmitter<Boolean>();

  private _direction: String = 'bottom';
  @Input('direction')
  public get direction() { return this._direction; }
  public set direction(value) {
    this._direction = value;
    if (this._direction != null) {}
  }

  private _selected: Boolean = false;
  @Input('selected')
  public get selected() { return this._selected; }
  public set selected(value) {
    if (this._selected != value) {
      this._selected = value;
      this.state = this._selected ? DtTogglePanelComponent.EXPANDED : DtTogglePanelComponent.COLLAPSED;
      this.opened.emit(this._selected);

    }
  }

  public state:String = DtTogglePanelComponent.COLLAPSED;

  public toggle() : void {
    this.state = (this.state == DtTogglePanelComponent.COLLAPSED ? DtTogglePanelComponent.EXPANDED : DtTogglePanelComponent.COLLAPSED);
    this.opened.emit(this.state == DtTogglePanelComponent.EXPANDED);
  }

  constructor() {
  }
}

