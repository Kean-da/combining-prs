class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    // Paste the codes you already did from the "Git Out Bug!" assignment
    // status(){}
    //Command: git status
    status(){        
        /*
            Create logic here and run unit testing.
        */
       const modified_files     = this.working_directory.new_changes;
       const numberOfPath_file  = Object.keys(modified_files).length; 
       let message            = `You have ${numberOfPath_file} change/s.`;

       if(numberOfPath_file > 0) {
            for(const key in modified_files) {
                message += `\n${key}`;
            }
            return message;
       } else {
            return 'You have 0 change/s.\n';
       }
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        }
        /*
            Create logic here then run unit testing. Make sure that they all pass before sending PR.
        */
        else{
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;
