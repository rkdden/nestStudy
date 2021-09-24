import { Controller, Get, Module } from "@nestjs/common";

@Controller()
class APPController {
  @Get()
  getRootRoute() {
    return 'hi there';
  }
}