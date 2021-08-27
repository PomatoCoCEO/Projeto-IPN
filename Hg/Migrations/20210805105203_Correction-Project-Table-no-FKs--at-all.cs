using Microsoft.EntityFrameworkCore.Migrations;

namespace Hg.Migrations
{
    public partial class CorrectionProjectTablenoFKsatall : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_AspNetUsers_ProgrammerId1",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_ProgrammerId1",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "ProgrammerId1",
                table: "Tasks");

            migrationBuilder.AlterColumn<string>(
                name: "ProgrammerId",
                table: "Tasks",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ProgrammerId",
                table: "Tasks",
                column: "ProgrammerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_AspNetUsers_ProgrammerId",
                table: "Tasks",
                column: "ProgrammerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_AspNetUsers_ProgrammerId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_ProgrammerId",
                table: "Tasks");

            migrationBuilder.AlterColumn<int>(
                name: "ProgrammerId",
                table: "Tasks",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProgrammerId1",
                table: "Tasks",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ProgrammerId1",
                table: "Tasks",
                column: "ProgrammerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_AspNetUsers_ProgrammerId1",
                table: "Tasks",
                column: "ProgrammerId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
