deploy link:https://deft-lebkuchen-e17e83.netlify.app/

report:
//two fingers
    用touch start取得兩隻手指碰觸到螢幕的位置
    並用touch move時監控兩隻手指的距離換算成放大縮小
    如果縮小程度<20px則設定為20px
//double touch
    雙擊時會選定選擇的div
    下次按螢幕中的任一位置會將其移動到指定位置並重置雙擊模式
    下次使用需再雙擊一次
//touch&drag
    用單指touch start決定初始位置來做校正(不然move位置會跑掉)
    並用touch move來移動方塊
//esc&3 fingers
    每個操作前會記錄方塊位置即選定方塊
    按下esc或3指會將操作復原置紀錄位置
//double click
    雙擊時會選定被雙擊的方塊
    並且跟隨滑鼠移動直到下次mouse down
//move&end
    按壓時選定被點到的方塊
    方塊會跟隨滑鼠移動
    直到mouse up
//click&color
    click時將選定到的方塊上色
    點擊非方塊區域則會取消選取


RRRR touch event好難測試啊