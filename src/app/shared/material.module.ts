import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [],
	imports: [CommonModule, MatTooltipModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
	exports: [MatTooltipModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
})
export class MaterialModule {}
