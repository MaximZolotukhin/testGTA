var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
let Post = class Post {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Post.prototype, "id", void 0);
__decorate([
    Column({ length: 200 }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
__decorate([
    ManyToOne('User', 'posts'),
    __metadata("design:type", Function)
], Post.prototype, "author", void 0);
Post = __decorate([
    Entity()
], Post);
export { Post };
