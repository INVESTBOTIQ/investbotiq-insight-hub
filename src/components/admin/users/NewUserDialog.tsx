
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface NewUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewUserDialog = ({ isOpen, onOpenChange }: NewUserDialogProps) => {
  const [newUserData, setNewUserData] = useState({
    email: "",
    name: "",
    role: "member",
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // In een echte implementatie zou dit een API call naar Supabase doen
    console.log("Creating new user:", newUserData);
    toast.success("Nieuwe gebruiker aangemaakt");
    onOpenChange(false);
    setNewUserData({
      email: "",
      name: "",
      role: "member",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nieuwe Gebruiker
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nieuwe gebruiker toevoegen</DialogTitle>
          <DialogDescription>
            Dit maakt een nieuwe gebruiker aan in het INVESTBOTIQ systeem. Er wordt automatisch een account aangemaakt.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddUser}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="email@voorbeeld.com"
                value={newUserData.email}
                onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name">Naam</label>
              <Input 
                id="name" 
                placeholder="Voornaam Achternaam"
                value={newUserData.name}
                onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role">Rol</label>
              <Select 
                value={newUserData.role} 
                onValueChange={(value) => setNewUserData({...newUserData, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer een rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Annuleren
            </Button>
            <Button type="submit">
              Gebruiker aanmaken
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
