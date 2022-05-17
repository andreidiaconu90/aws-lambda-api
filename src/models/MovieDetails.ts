import { ActorDetails } from "./ActorDetails";
import { DirectorDetails } from "./DirectorDetails";

export interface MovieDetails {
    Title: string;
    Year: string;
    Cast?: ActorDetails[];
    DirectedBy?: DirectorDetails[];
}
