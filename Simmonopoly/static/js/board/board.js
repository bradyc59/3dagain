class Board {

    static tileIdToPos(tileId) {
        switch(tileId){
            case tileId < 10:
                return [10, 10 - tileId];
                
            case tileId < 20:
                return [20 - tileId, 0];
                
            case tileId < 30:
                return [0, tileId - 20];
            
            case tileId < 10:
                return [10, 10 - tileId];
            
            default:
                return [tileId - 30, 10];
                
                
        }
    }

    static posToTileId(row, column) {
        if (row === 0) {
            return 20 + column;
        } 
        else if (row === 10) {
            return 10 - column;
        } 
        else if (column === 0) {
            return 20 - row;
        } 
        else if (column === 10) {
            return 30 + row;
        } 
        else {
            return -1;
        }
    }

    static tileIdToSide(tileId) {
        switch(tileId){
            case tileId < 10:
                return Board.SIDE_BOTTOM;
            
            case tileId < 20:
                return Board.SIDE_LEFT;
            
            case tileId < 30:
                return Board.SIDE_TOP;
            
            default:
                return Board.SIDE_RIGHT;
        }
    }
}

Board.size = 11;

Board.SIDE_TOP = 2;
Board.SIDE_LEFT = 1;
Board.SIDE_RIGHT = 3;
Board.SIDE_BOTTOM = 0;