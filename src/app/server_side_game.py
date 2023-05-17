
import math
from random import randint
from copy import deepcopy

def getRandomInt(min_value, max_value):
    return randint(min_value, max_value)

class Game():
    def __init__(self) -> None:
        self._countRows = 12
        self._countColumns = 12
        
        self._matrixLetter = self.createMatrix()
        self._selectedPoints = []
        
    def countRows(self):
        return self._countRows

    def countColumns(self):
        return self._countColumns
    
    @property
    def selectedPoints(self):
        return self._selectedPoints

    @selectedPoints.setter
    def selectedPoints(self, value):
        self._selectedPoints = value
    
    
    def createMatrix(self):
        self._matrixLetter = [[0 for _ in range(self._countRows)] for _ in range(self._countColumns)]

        for i in range(0, self._countRows):
            for j in range (0, self._countColumns):
                self.letterTemp = getRandomInt(65, 90)
                self._matrixLetter[i][j] = chr(self.letterTemp)
        return self._matrixLetter
    
    
    @property
    def matrix(self):
        return self._matrixLetter
    
    def shuffleRow(self):
        for i in range(0, self._countRows - 1):
            j = math.floor(randint(0, i + 1))
            [self._matrixLetter[i], self._matrixLetter[j]] = [self._matrixLetter[j], self._matrixLetter[i]]
            
    def transposing(self):
        newArray = []
        for i in range(0, self._countRows):
            newArray.append([])

        for i in range(0, self._countRows):
            for j in range(0, self._countRows):
                newArray[j].append(self._matrixLetter[i][j])
            
        self._matrixLetter = newArray
        
    
def drawNewMatrix(matrix, points):
    newMatrix = deepcopy(matrix)
    for point in points:
        x = point[0]
        y = point[1]
        t = getRandomInt(65, 90)
        newMatrix[x][y] = chr(t)
    return newMatrix
                
    
if __name__=='__main__':
    game= Game()
    game.createMatrix()
    
    