using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hg.Data.DbData
{
    public class ProjTask
    {
        [Key]
        public int Id { get;set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }

        public bool Finished { get; set; } // db migration is necessary
        public Project Project { get; set; }
        public HgUser Programmer { get; set; }
        // [ForeignKey("User")]
        // public int ProgrammerId { get; set; } 

    }
}