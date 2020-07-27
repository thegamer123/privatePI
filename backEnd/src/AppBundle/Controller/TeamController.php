<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Team;

class TeamController extends Controller
{

    // GET all teams
    public function getAllTeamAction()
    {
        $em = $this->getDoctrine()->getManager();
        $teams = $em->getRepository('AppBundle:Team')->findAll();
        $data = $this->get('jms_serializer')->serialize($teams, 'json');
        $response = new Response($data);
        return $response;
    }


    // POST Team
    public function newTeamAction(Request $request) {
        
        $data = $request->getContent();
        //deserialize the data
        $team = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\Team", "json");
        // add data to DB
        $em= $this->getDoctrine()->getManager();
        $em->persist($team);
        $em->flush();
        return new Response(($team->getId()), 201);
    }


    // Get one category by Id
    public function getTeambyIdAction(Team $team) {
        $data = $this->get('jms_serializer')->serialize($team, 'json');
        $response = new Response($data);
        return $response;
    }

    // PUT edit Team by id
    public function editTeamAction(Request $request, $id) {

        $doctrine = $this->getDoctrine();
        $manager = $doctrine->getManager();
        $team_to_update = $doctrine->getRepository('AppBundle:Team')->find($id);
        $data = $request->getContent();
        $team = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\Team", "json");
        $team_to_update->setName($team->getName());
        $team_to_update->setFieldOfActivity($team->getFieldOfActivity());
        $team_to_update->setVelocity($team->getVelocity()); 
        $team_to_update->setLogo($team->getLogo()); 
        $manager->persist($team_to_update);
        $manager->flush();
        return new Response('Team updated successfully', 200);
    }


    // DELETE delete Team project by id
    public function deleteTeamAction(Request $request) {
        $id = $request->get('id');
        $manager = $this->getDoctrine()->getManager();
        $team = $manager->getRepository('AppBundle:Team')->find($id);
        $manager->remove($team);
        $manager->flush();
        return new Response('Team deleted successfully', 200);
    }

    public function updateUserTeamIdAction(Request $request) {
        // Update user Team id
        // initial data
        $json =json_decode($request->getContent());
        $idTeam = $json->{'idTeam'};
        $usersIds = $json->{'users'};
        $usersToremove = $json->{'user_to_remove'};
        var_dump($usersToremove);
        $doctrine = $this->getDoctrine();
        $em= $this->getDoctrine()->getManager();
        $team = $doctrine->getRepository('AppBundle:Team')->find($idTeam);

        // set ids teams to Null in update team
        foreach ($usersToremove as $userId){
            $user = $doctrine->getRepository('AppBundle:User')->find($userId);
            if ($user != NULL) {
                $user->setTeam(NULL);
                $em->persist($user);
                $em->flush();
            }
        }

        // for each user in json 'users' add idTeam
        foreach ($usersIds as $userId){
         $user = $doctrine->getRepository('AppBundle:User')->find($userId);
         $user->setTeam($team);
         $em->persist($user);
         $em->flush();
        }
        return new Response('updated user team' , 200);
    }
}
