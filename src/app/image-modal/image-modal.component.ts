import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaService } from '../media.service';
import { Image } from '../types/Image';

@Component({
  selector: 'image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public image: Image) {}
}
