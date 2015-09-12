/// <reference path="../typings/angular2/angular2.d.ts" />

import {Injectable} from 'angular2/angular2';
import {Move} from './move';
import {Moves} from './moves';
import {Engine} from './chessboard';

export module ChessEngineAPI {
    @Injectable() export class ChessboardUI {
        selectedPieceRow: number;
        selectedPieceCol: number;
        isPieceSelected: boolean = false;

        private chessboard: Engine.Chessboard = new Engine.Chessboard(new Array<Move>());

        get fields(): number[][] {
            return this.chessboard.fields;
        }

        get isWhitePlaying(): boolean { return this.chessboard.isWhitePlaying }

        get capturedPieces(): Array<number> { return this.chessboard.capturedPieces }

        get check(): boolean  { return this.chessboard.check }
        get checkMate(): boolean { return this.chessboard.checkMate }
        get staleMate(): boolean { return this.chessboard.staleMate }
        get ownCheck(): boolean {  return this.chessboard.ownCheck  }
        get ownCheckMate(): boolean{ return this.chessboard.ownCheckMate }

        public ownThreats(row:number, col:number): number {
          return this.chessboard.ownThreats(row, col);
        }

        public opponentThreats(row:number, col:number): number {
          return this.chessboard.opponentThreats(row, col);
        }


        get moveHistory() : Array<Move> { return this.chessboard.moveHistory}

        onclick(row: number, col: number): void {
            if (!this.isPieceSelected)
                this.setSelectedPiece(row, col);
            else {
                this.isPieceSelected = false;
                if (this.chessboard.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, row, col)) {
                    this.chessboard.move(this.selectedPieceRow, this.selectedPieceCol, row, col, this.isWhitePlaying?5:-5);
                }
            }
        }

        setSelectedPiece(row: number, col: number): void {
            var piece = this.chessboard.fields[row][col];
            if (this.isWhitePlaying) {
                if (piece <= 0) return;
            } else {
                if (piece >= 0) return;
            }

            this.isPieceSelected = true
            this.selectedPieceRow = row
            this.selectedPieceCol = col
        }


        isLegalMove2(toRow: number, toCol: number): boolean {
            if (!this.isPieceSelected)
                return false;
            return this.chessboard.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, toRow, toCol)
        }

        public revertLastMove(): void {
          this.chessboard.revertLastMove();
        }

    }
}
