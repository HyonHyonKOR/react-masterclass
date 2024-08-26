//import 모듈의 타입 정의를 가져오기 위해 데이터들을 불러온다
import "styled-components";

//declare 기존의 모듈을 확장,병합할 것을 선언한다
declare module "styled-componets" {
  //export 정의한 객체를 다른 라이브러리에도 사용할 수 있도록 밖으로 내는 것을 허가한다
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    cardColor: string;
    fontColor: string;
  }
}
