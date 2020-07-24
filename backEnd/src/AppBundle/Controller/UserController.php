<?php


namespace AppBundle\Controller;


use AppBundle\Service\Validate;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\FOSUserEvents;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;


/**
 * Facture controller.
 *
 * @Route("user")
 */
class UserController extends Controller
{

    /**
     * @Route("/createUser",name="create_user")
     * @Method({"POST"})
     */
    public function createUser(Request $request)
    {
        //http://127.0.0.1:8000/user/createUser
        $userManager = $this->get('fos_user.user_manager');
        $entityManager = $this->get('doctrine')->getManager();
        $data = $request->request->all();

        // Do a check for existing user with userManager->findByUsername

        $user = $userManager->createUser();
        $user->setUsername($data['username']);
        // ...
        $user->setPlainPassword($data['password']);
        $user->setEmail($data['email']);
        $user->setEnabled(true);

        $userManager->updateUser($user);

        return $this->generateToken($user, 201);


    }

    protected function generateToken($user, $statusCode = 200)
    {
        // Generate the token
        $token = $this->get('lexik_jwt_authentication.jwt_manager')->create($user);

        $response = array(
            'token' => $token,
            'user' => $user // Assuming $user is serialized, else you can call getters manually
        );

        return new JsonResponse($response, $statusCode); // Return a 201 Created with the JWT.
    }


    /**
     * @Route("/allUsers",name="list_users")
     * @Method({"GET"})
     */

    public function listUsers()
    {
//http://127.0.0.1:8000/user/allUsers
        $posts = $this->getDoctrine()->getRepository('AppBundle:User')->findAll();

        if (!count($posts)) {
            $response = array(
                'code' => 1,
                'message' => 'No Users found!',
                'errors' => null,
                'result' => null
            );

            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }

        $data = $this->get('jms_serializer')->serialize($posts, 'json');
        $response = array(

            'code' => 0,
            'message' => 'success',
            'errors' => null,
            'result' => json_decode($data)

        );
        return new JsonResponse($response, 200);

    }

    /**
     * @Route("/{id}",name="user_details")
     * @Method({"GET"})
     */

    public function getUserById($id)
    {
//http://127.0.0.1:8000/user/2
        $user = $this->getDoctrine()->getRepository('AppBundle:User')->find($id);

        if (empty($user)){
            $response=array(
                'code'=>1,
                'message'=>'post not found',
                'error'=>null,
                'result'=>null
            );

            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }

        $data=$this->get('jms_serializer')->serialize($user,'json');


        $response=array(

            'code'=>0,
            'message'=>'success',
            'errors'=>null,
            'result'=>json_decode($data)

        );
        return new JsonResponse($response,200);

    }
    /**
     * @Route("/username/{username}",name="user_details")
     * @Method({"GET"})
     */

    public function getUserByUserName($username)
    {
//http://127.0.0.1:8000/user/username/username
        $user = $this->getDoctrine()->getRepository('AppBundle:User')->findBy(array('username' => $username));

        if (empty($user)){
            $response=array(
                'code'=>1,
                'message'=>'post not found',
                'error'=>null,
                'result'=>null
            );

            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }

        $data=$this->get('jms_serializer')->serialize($user,'json');


        $response=array(

            'code'=>0,
            'message'=>'success',
            'errors'=>null,
            'result'=>json_decode($data)

        );
        return new JsonResponse($response,200);

    }

}