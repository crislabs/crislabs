
// you can add validate using class-validator
export class SingleFileDto{
    // @ApiProperty({type:"string",format:"binary"})
    photo_url:string

    // @ApiProperty({example:"Rom"})
    siteId:string
    parentId:string
    type:string

}